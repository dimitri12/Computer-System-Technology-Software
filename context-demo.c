#include <stdio.h>
#include <stdlib.h>
#include "kernel.h"
#include <LIMITS.h>
#include <string.h>
#include <math.h>
//#include "kernel_hwdep.h"

#include <cmath>

unsigned int set_isr( unsigned int newCSR ){                    // REMOVE
  return 0;
}

/*Global variables*/
uint tick;
exception state;
list *TimerList;
list *ReadyList;
list *WaitingList;
TCB *Running;
void idle(void);
void uppdateRunning(void);
void insertSendMsg(mailbox * mb,msg *message);
void insertReceiveMsg(mailbox * mb,msg *message);
msg *extractMsg(mailbox * mb);
msg *extractMsgSend(mailbox * mb);
msg *extractMsgReceive(mailbox * mb);
msg *extractSpecMsgSend(mailbox * mb,msg * message);
msg *extractSpecMsgReceive(mailbox * mb,msg * message);
mailbox *mb;

#define largest_int 4294967295
#define ASYNC 0
#define SYNC !ASYNC

void isr_off(void){}                                                              // REMOVE
void isr_on(void){}                                                                                                           // REMOVE

exception inputT(list *tL, listobj * tLO);
listobj * extractT(list *tL);
exception inputR_W(list *r_wL, listobj * r_wLO);
listobj * extractR(list *rL);
listobj * extractW(list *wL,listobj * pBlock);
exception initList(void);

exception initList(void){
TimerList = malloc(sizeof(list)); 
ReadyList = malloc(sizeof(list)); 
WaitingList = malloc(sizeof(list)); 
listobj *headT= malloc(sizeof(listobj)); 
listobj *tailT = malloc(sizeof(listobj)); 
listobj *headR= malloc(sizeof(listobj)); 
listobj *tailR = malloc(sizeof(listobj)); 
listobj *headW= malloc(sizeof(listobj)); 
listobj *tailW = malloc(sizeof(listobj)); 
if(TimerList==NULL || ReadyList==NULL || WaitingList==NULL || headT==NULL|| tailT==NULL || headR==NULL || tailR==NULL || headW==NULL || tailW==NULL){
    free(TimerList);
    free(WaitingList);
    free(ReadyList);
    free(headT);
    free(tailT);
    free(headR);
    free(tailR);
    free(headW);
    free(tailW);
    return FAIL;
}else{
TimerList->pHead = headT; 
TimerList->pTail= tailT; 
TimerList->pHead->pNext = TimerList->pTail; 
TimerList->pTail->pPrevious = TimerList->pHead; 
ReadyList->pHead = headR; 
ReadyList->pTail= tailR;
ReadyList->pHead->pNext = ReadyList->pTail;
ReadyList->pTail->pPrevious = ReadyList->pHead; 
WaitingList->pHead = headW;
WaitingList->pTail= tailW;
WaitingList->pHead->pNext = WaitingList->pTail;
WaitingList->pTail->pPrevious = WaitingList->pHead;
return OK;
  }
}

exception init_kernel(){
    tick = 0;
    if(initList()==FAIL) return FAIL;
    void (*pIdle)(void) = &idle;
    if(create_task(pIdle,largest_int)==FAIL){
      free(TimerList->pHead);
      free(TimerList->pTail);
      free(TimerList);
      free(WaitingList->pHead);      
      free(WaitingList->pTail);
      free(WaitingList);
      free(ReadyList->pHead);      
      free(ReadyList->pTail);
      free(ReadyList);     
      return FAIL;
    }     
    state = INIT;
    return OK;
}

exception create_task( void (* task_body)(), uint deadline ){
    unsigned int oldState = set_isr(0);
    volatile int first = TRUE;
    listobj *newObj =malloc(sizeof(listobj)) ;
    TCB *newTCB = malloc(sizeof (TCB));
    if(newObj == NULL || newTCB == NULL){
        free(newTCB);
        free(newObj);
        set_isr(oldState);
        return FAIL;  
    }else{
	newObj->pTask = newTCB;
	newTCB->DeadLine = deadline;
	newTCB->SP =  &(newTCB->StackSeg[STACK_SIZE-1]);
        newTCB->SPSR = 0;

	newTCB->PC = task_body;
	if(state == INIT){
		inputR_W(ReadyList,newObj);
		uppdateRunning();
                return OK;
	}
	else{
            isr_off();
	    SaveContext();
	    if(first){
                first = FALSE;
		inputR_W(ReadyList,newObj);
		uppdateRunning();
                LoadContext();
	    }
	}
	
    }
    return OK;
}

void run(void){
    //Init interrupt timer
    state = RUNNING;
    LoadContext();
}

void terminate(void){
    isr_off();
    if(ReadyList->pHead->pNext->pTask->DeadLine != largest_int){
        listobj *tempListobj;
        tempListobj = extractR(ReadyList);
        free(tempListobj->pTask);
        free(tempListobj);
        uppdateRunning();
    }
    LoadContext();
}

mailbox* create_mailbox( uint nMessages, uint nDataSize ){
    unsigned int oldState = set_isr(0);
    mailbox *mb = malloc(sizeof(mailbox));
    msg *head = malloc(sizeof(msg));
    msg *tail = malloc(sizeof(msg));
    if(mb == NULL || head == NULL || tail == NULL){
        free(mb);
        free(head);
        free(tail);
        set_isr(oldState);
        return NULL;
    }else{
        mb->pHead = head;
        mb->pTail = tail;
        mb->pHead->pNext = tail;
        mb->pTail->pPrevious = head;
        mb->nMaxMessages = nMessages;
        mb->nDataSize = nDataSize;
        mb->nBlockedMsg = mb->nMessages = 0;
        set_isr(oldState);
        return mb;
    }
    return NULL;
}

exception remove_mailbox(mailbox* mBox){
    unsigned int oldState = set_isr(0);
    if(mBox->pHead->pNext == mBox->pTail){
        free(mBox);
        set_isr(oldState);
        return OK;
    }else{
        set_isr(oldState);
        return NOT_EMPTY;
    }
}

exception send_wait( mailbox* mBox, void* Data){
    volatile int first = TRUE;
    isr_off();
    SaveContext();
    if(first){
        first = FALSE;
        if(mBox->nBlockedMsg < 0){
            msg *info;
            memcpy(mBox->pHead->pNext->pData,Data,mBox->nDataSize);//(dest,src,size)
            info = extractMsgSend(mBox);
            inputR_W(ReadyList,extractW(WaitingList, info->pBlock));
            uppdateRunning();
            info->pBlock->pMessage = NULL;
            free(info);
        }else{
            if(mBox->nMessages <= 0){
                msg *message = malloc(sizeof(msg));
                if(message == NULL){
                  free(message);
                  return FAIL;
                }
                message->pData = Data;
                message->pBlock = ReadyList->pHead->pNext;
                ReadyList->pHead->pNext->pMessage = message;
                insertSendMsg(mBox, message);
                inputR_W(WaitingList, extractR(ReadyList));
                uppdateRunning();
            }
        }
        LoadContext();
    }else{
        if(Running->DeadLine <= tick){
            isr_off();
            free(extractSpecMsgSend(mBox,ReadyList->pHead->pNext->pMessage));
            ReadyList->pHead->pNext->pMessage = NULL;
            isr_on();
            return DEADLINE_REACHED;
        }else{
            return OK;
        }
    }
    return OK;
}
exception receive_wait(mailbox *mBox, void *Data){
    volatile int FIRST = TRUE;
    isr_off();
   SaveContext();
    if(FIRST){
        FIRST = FALSE;
        if(mBox->nBlockedMsg > 0 || mBox->nMessages > 0){
            msg *info;
            memcpy(Data,mBox->pHead->pNext->pData,mBox->nDataSize);
            info = extractMsgReceive(mBox);
            if(info->pBlock != NULL){
                inputR_W(ReadyList,extractW(WaitingList, info->pBlock));
                uppdateRunning();
                info->pBlock->pMessage = NULL;
                free(info);
            }else{
                free(info->pData);
                free(info);
            }
        }else{
            msg *message = malloc(sizeof(msg));
            if(message == NULL){
              free(message);
              return FAIL;
            }
            message->pData = Data;
            message->pBlock = ReadyList->pHead->pNext;
            ReadyList->pHead->pNext->pMessage = message;
            insertReceiveMsg(mBox, message);
            inputR_W(WaitingList,extractR(ReadyList));
            uppdateRunning();
        }
        LoadContext();
    }else{
        if(Running->DeadLine <= tick){
            isr_off();
            free(extractSpecMsgReceive(mBox,ReadyList->pHead->pNext->pMessage));
            ReadyList->pHead->pNext->pMessage = NULL;
            isr_on();
            return DEADLINE_REACHED;
        }else{
            return OK;
        }
    }
    return OK;
}

exception send_no_wait( mailbox *mBox, void *Data){
    volatile int FIRST = TRUE;
    isr_off();
    SaveContext();
    if(FIRST){
        FIRST = FALSE;
        if(mBox->nBlockedMsg < 0){
            msg *info;
            memcpy(mBox->pHead->pNext->pData,Data,mBox->nDataSize);
            info = extractMsgSend(mBox);
            inputR_W(ReadyList,extractW(WaitingList, info->pBlock));
            uppdateRunning();
            info->pBlock->pMessage = NULL;
            free(info);
            LoadContext();
        }else{
            if(mBox->nBlockedMsg == 0){
                msg *message = malloc(sizeof(msg));
                message->pData = malloc(sizeof(message->pData));
                if(message == NULL || message->pData == NULL){
                  free(message->pData);
                  free(message);
                  return FAIL;
                }
                message->pData = Data;
                message->pBlock = NULL;
                insertSendMsg(mBox, message);
            }else{
                return FAIL;
            }
        }
    }
    return OK;
}

exception receive_no_wait(mailbox *mBox, void *Data){
    volatile exception status = OK;
    volatile int FIRST = TRUE;
    isr_off();
    SaveContext();
    if(FIRST){
        FIRST = FALSE;
        if(mBox->nBlockedMsg > 0 || mBox->nMessages > 0){
            msg *info;
            memcpy(Data,mBox->pHead->pNext->pData,mBox->nDataSize);
            info = extractMsgReceive(mBox);
            if(info->pBlock != NULL){
                inputR_W(ReadyList,extractW(WaitingList, info->pBlock));
                uppdateRunning();
                info->pBlock->pMessage = NULL;
                free(info);
            }else{
                free(info->pData);
                free(info);
            }
        }else{
            status = FAIL;
        }
        LoadContext();
            
    }
    return status;
}

exception Wait(uint nTicks){
   
  volatile int first = TRUE;
    exception status = OK;
    isr_off();
    SaveContext();
    if(first){
        first = FALSE;
        ReadyList->pHead->pNext->nTCnt = nTicks+tick;
        inputT(TimerList, extractR(ReadyList));
        uppdateRunning();
        LoadContext();
    }else{
        if(Running->DeadLine <= tick){
            status = DEADLINE_REACHED;
        }else{
            status = OK;
        }
    }
    return status;
    
}

void set_ticks(uint nTicks){
    tick = nTicks;
}

uint ticks(void){
    return tick;
}

uint deadline(void){
    return Running->DeadLine;
}

void set_deadline(uint deadline){
    volatile int first = TRUE;
    isr_off();
    SaveContext();
    if(first){
        first = FALSE;
        Running->DeadLine = deadline;
        inputR_W(ReadyList, extractR(ReadyList));
        uppdateRunning();
        LoadContext();
    }
}

void TimerInt(void){
    tick++;
    if(TimerList->pHead->pNext == TimerList->pTail || TimerList->pHead->pNext->nTCnt > tick){
    }else{
        while(TimerList->pHead->pNext->nTCnt == tick){
            inputR_W(ReadyList, extractT(TimerList));
            uppdateRunning();
        }
    }
    
    if(WaitingList->pHead->pNext == WaitingList->pTail || WaitingList->pHead->pNext->pTask->DeadLine > tick){
    }else{
        while(WaitingList->pHead->pNext->pTask->DeadLine == tick){
            inputR_W(ReadyList, extractW(WaitingList, WaitingList->pHead->pNext));
            uppdateRunning();
        }
    }
}




/*------------------Task--------------------------------------------------------------------------------*/
void idle(void){

  while(1){
    SaveContext();   
    TimerInt();
    LoadContext();
  }
}

/*------------------End of task-------------------------------------------------------------------------*/

/*------------------mailbox--------------------------------------------------------------------------------*/
void insertSendMsg(mailbox * mb,msg *message){
    msg * temp = mb->pHead;
    if(mb->nMaxMessages == abs(mb->nMessages + mb->nBlockedMsg)){
        msg *tempFree = temp->pNext;
        mb->pHead->pNext = tempFree->pNext;
        mb->pHead->pNext->pPrevious = mb->pHead;
        if(message->pBlock != NULL){
            free(tempFree);
            mb->nBlockedMsg--;
        }else{
            free(tempFree->pData);
            free(tempFree);
            mb->nMessages--;
        }
    }
    message->pNext = mb->pTail;
    message->pPrevious = mb->pTail->pPrevious;
    mb->pTail->pPrevious = message;
    message->pPrevious->pNext = message;
    if(message->pBlock != NULL){
        mb->nBlockedMsg++;
    }else{
        mb->nMessages++;
    }
}

void insertReceiveMsg(mailbox * mb,msg *message){
    msg * temp = mb->pHead;
    if(mb->nMaxMessages == abs(mb->nMessages + mb->nBlockedMsg)){
        msg *tempFree = temp->pNext;
        temp->pNext = temp->pNext->pNext;
        temp->pNext->pPrevious = temp;
        if(message->pBlock != NULL){
            free(tempFree);
            mb->nBlockedMsg++;
        }else{
            free(tempFree->pData);
            free(tempFree->pData);
            mb->nMessages++;
        }
    }
    message->pNext = mb->pTail;
    message->pPrevious = mb->pTail->pPrevious;
    mb->pTail->pPrevious = message;
    message->pPrevious->pNext = message;
    if(message->pBlock != NULL){
        mb->nBlockedMsg--;
    }else{
        mb->nMessages--;
    }
}



msg *extractMsgSend(mailbox * mb){
    if((mb->nMessages + mb->nBlockedMsg) == 0){
        return FAIL;
    }else{
        msg *tempFree = mb->pHead->pNext;
        mb->pHead->pNext = mb->pHead->pNext->pNext;
        mb->pHead->pNext->pPrevious = mb->pHead;
        if(tempFree->pBlock != NULL){
            mb->nBlockedMsg++;
        }else{
            mb->nMessages++;
        }
        tempFree->pNext = tempFree->pPrevious = NULL;
        return tempFree;
    }
}
msg *extractMsgReceive(mailbox * mb){
    if((mb->nMessages + mb->nBlockedMsg) == 0){
        return FAIL;
    }else{
        msg *tempFree = mb->pHead->pNext;
        mb->pHead->pNext = mb->pHead->pNext->pNext;
        mb->pHead->pNext->pPrevious = mb->pHead;
        if(tempFree->pBlock != NULL){
            mb->nBlockedMsg--;
        }else{
            mb->nMessages--;
        }
        tempFree->pNext = tempFree->pPrevious = NULL;
        return tempFree;
    }
}


msg *extractSpecMsgSend(mailbox * mb,msg * message){
    if((mb->nMessages + mb->nBlockedMsg) == 0){
        return FAIL;
    }else{
        msg *temp = mb->pHead->pNext;
        while(temp->pBlock->pMessage != message){
            temp = temp->pNext;
        }
        temp->pNext->pPrevious = temp->pPrevious;
        temp->pPrevious->pNext = temp->pNext;
        temp->pNext = NULL;
        temp->pPrevious = NULL;
        if(temp->pBlock != NULL){
            mb->nBlockedMsg--;
        }else{
            mb->nMessages--;
        }
        return temp;
    }
}

msg *extractSpecMsgReceive(mailbox * mb,msg * message){
    if((mb->nMessages + mb->nBlockedMsg) == 0){
        return FAIL;
    }else{
        msg *temp = mb->pHead->pNext;
        while(temp->pBlock->pMessage != message){
            temp = temp->pNext;
        }
        temp->pNext->pPrevious = temp->pPrevious;
        temp->pPrevious->pNext = temp->pNext;
        temp->pNext = NULL;
        temp->pPrevious = NULL;
        if(temp->pBlock != NULL){
            mb->nBlockedMsg++;
        }else{
            mb->nMessages++;
        }
        return temp;
    }
}

/*------------------End of mailbox-------------------------------------------------------------------------*/

/*------------------ListFunctions-----------------------------------------------------------------------*/

/*------------------Input in Timerlist------------------------------------------------------------------*/
/*Input: The waiting list, The object that you want to put on to the list*/
/*Output: None*/
/*After: The list containes the provided listobject on the following order: smalest nTCnt first and the largest last*/
/*------------------------------------------------------------------------------------------------------*/
exception inputT(list *tL, listobj * tLO){
    listobj *current;
    current = tL->pHead;
    while(current->pNext != tL->pTail){
        if(tLO->nTCnt <= current->pNext->nTCnt){
            tLO->pNext = current->pNext;
            tLO->pNext->pPrevious->pNext = tLO;
            tLO->pPrevious = tLO->pNext->pPrevious;
            tLO->pNext->pPrevious  = tLO;
            return OK;
        }
        current = current->pNext;
    }
    if (current->pNext == tL->pTail) {
        tLO->pNext = tL->pTail;
        tLO->pNext->pPrevious->pNext = tLO;
        tLO->pPrevious = tLO->pNext->pPrevious;
        tLO->pNext->pPrevious  = tLO;
        return OK;
    }
    return FAIL;
}
/*------------------End of Input in Timerlist-----------------------------------------------------------*/

/*------------------Extract from Timerlist--------------------------------------------------------------*/
/*Input: The waitinglist, The object that you want to put on to the list*/
/*Output: The first listobject in the list*/
/*------------------------------------------------------------------------------------------------------*/
listobj * extractT(list *tL){
    if(tL->pHead->pNext == tL->pTail){
        return 0;
    }else{
        listobj *temp = tL->pHead->pNext;
        tL->pHead->pNext = tL->pHead->pNext->pNext;
        tL->pHead->pNext->pPrevious = tL->pHead;
        temp->pNext = NULL;
        temp->pPrevious = NULL;
        return temp;
    }
}
/*------------------End of Extract from Timerlist------------------------------------------------------*/

/*------------------Input in Readylist/Waitinglist-----------------------------------------------------*/
/*Input: The readylist, the object that you want to put on to the list*/
/*Output: None*/
/*After: The list containes the provided listobject on the following order: smalest deadline first and the largest last*/
/*-----------------------------------------------------------------------------------------------------*/
exception inputR_W(list *r_wL, listobj * r_wLO){
    listobj *current;
    current = r_wL->pHead;
    while(current->pNext != r_wL->pTail){
        if(r_wLO->pTask->DeadLine <= current->pNext->pTask->DeadLine){
            r_wLO->pNext = current->pNext;
            r_wLO->pNext->pPrevious->pNext = r_wLO;
            r_wLO->pPrevious = r_wLO->pNext->pPrevious;
            r_wLO->pNext->pPrevious  = r_wLO;
            return OK;
        }
        current = current->pNext;
    }
    if (current->pNext == r_wL->pTail) {
        r_wLO->pNext = r_wL->pTail;
        r_wLO->pNext->pPrevious->pNext = r_wLO;
        r_wLO->pPrevious = r_wLO->pNext->pPrevious;
        r_wLO->pNext->pPrevious  = r_wLO;
        return OK;
    }
    return FAIL;
}
/*------------------End of Input in Readylist---------------------------------------------------------*/

/*------------------Extract from Readylist------------------------------------------------------------*/
/*Input: The readylist*/
/*Output: The first listobject in the list*/
/*----------------------------------------------------------------------------------------------------*/
listobj * extractR(list *rL){
    if(rL->pHead->pNext == rL->pTail){
        return 0;
    }else{
        listobj *temp = rL->pHead->pNext;
        rL->pHead->pNext = rL->pHead->pNext->pNext;
        rL->pHead->pNext->pPrevious = rL->pHead;
        temp->pNext = NULL;
        temp->pPrevious = NULL;
        return temp;
    }
}
/*------------------End of Extract from Readylist-----------------------------------------------------*/

/*------------------Extract from Waitinglist----------------------------------------------------------*/
/*Input: The waiting list, The object that you want to put on to the list*/
/*Output: The searched object*/
/*----------------------------------------------------------------------------------------------------*/
listobj * extractW(list *wL,listobj * pBlock){
    listobj * current = wL->pHead;
    while(current->pNext != wL->pTail){
        if(current->pNext == pBlock){
            current->pNext = current->pNext->pNext;
            current->pNext->pPrevious = current;
            pBlock->pNext = NULL;
            pBlock->pPrevious = NULL;
            return pBlock;
        }
        current = current->pNext;
    }
    return 0;
    
}
/*------------------End of Extract from Waitinglist---------------------------------------------------*/

/*------------------UppdateRunning----------------------------------------------------------*/
/*Change the running pointer to the first object in the readylist*/
/*----------------------------------------------------------------------------------------------------*/
void uppdateRunning(void){
    Running = ReadyList->pHead->pNext->pTask;
}

/*------------------End of UppdateRunning---------------------------------------------------*/

/*------------------End of ListFunctions--------------------------------------------------------------*/

/*------------------Application program-----------------------------------------------------*/

void receiver(void);
void sender(void);
void check(void);
void t(void);
void t1(void);
void t2(void);

int main(void)
{
  init_kernel();
  mb = create_mailbox(1,sizeof(int));
  create_task(&receiver,30);
  create_task(&sender,40);
  create_task(&check,50);  
  create_task(&t,60); 
  create_task(&t1,61); 
  create_task(&t2,62);   
  run();
  
}

void receiver(void){
  int a = 0;
  int b = 0;
  send_wait(mb,&a);
/*  receive_wait(mb,&a);
 
  int sum = 0;
  receive_wait(mb,&a);
  sum = sum + a;
  receive_wait(mb,&b);
  sum = sum + b;
  send_no_wait(mb,&sum);
 */ terminate();
}

void sender(void){
    int a1 = rand() % 100 + 1;
    int a2 = rand() % 100 + 1;
    send_wait(mb,&a1);
    /*send_wait(mb,&a1);
    send_wait(mb,&a2);
    Wait(10);
    a1 = a1 + a2;
    send_no_wait(mb,&a1);
 */   terminate();
}

void check(void){
  int a = 0;
    send_wait(mb,&a); 
/*    int receiver = 0;
    int sender = 0;
    remove_mailbox(mb);
    receive_no_wait(mb,&receiver);
    receive_wait(mb,&sender);
    if(receiver == sender){
      if(remove_mailbox(mb))
        sender = sender;
    }else{
      //FAIL
    }
*/    terminate();
}

void t(void){
  int a;
  send_wait(mb,&a);
  terminate();
}

void t1(void){
  int a;
  send_wait(mb,&a);
  terminate();
}


void t2(void){
  int a;
  send_wait(mb,&a);
  terminate();
}

/*------------------End of Application program-----------------------------------------------------*/

