var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	evaluationPassword: { information : String}
});
module.exports = mongoose.model('evaluationData', userSchema);