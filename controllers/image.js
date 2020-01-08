const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '427ec6861bfc4b128975c787cc8f59c7'
});

const handleApiCall = (req,res) => {
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
	res.json(data)
})
.catch(err => { res.status(400).json('unable to work with API')})
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {
		res.status(400).json('not found');
	})
}

module.exports = {
	handleImage,
	handleApiCall
};