const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema');

//create
router.post('/create', (req, res) => {
  const temp = req.body;

  Counter.findOne({ name: 'counter' })
    .exec()
    .then(doc => {
      temp.communityNum = doc.communityNum;

      //현재 로그인된 사용자의 아이디로 User컬렉션으로부터 document를 찾고
      User.findOne({ uid: temp.uid }).exec()
        .then(doc => {
          //해당 document의 object.id값을 bodyParser객체에 writer키값에 등록
          temp.writer = doc._id;

          //위에서 만들어진 최종 temp객체로 PostModel인스턴스 생서후 DB에 저장
          const PostModel = new Post(temp);

          PostModel.save().then(() => {
            Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
              .then(() => {
                res.json({ success: true })
              })
          })
        })
    })
    .catch(err => console.log(err))

});

//read
router.get('/read', (req, res) => {
  const sort = { createdAt: -1 };
  if (req.query.sort === 'new') sort.createdAt = -1;
  else sort.createdAt = 1;

  Post.find()
    .populate('writer')
    .sort(sort)
    .limit(req.query.count)
    .exec()
    .then(doc => {
      res.json({ success: true, communityList: doc })
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })

})

//detail
router.get('/detail', (req, res) => {
  Post.findOne({ communityNum: req.query.num }).populate('writer').exec()
    .then(doc => {
      res.json({ success: true, detail: doc });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    })
});


//update
router.put('/update', (req, res) => {
  const temp = {
    title: req.body.title,
    content: req.body.content
  }

  Post.updateOne({ communityNum: req.body.num }, { $set: temp })
    .exec()
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })
})

//delete
router.delete('/delete/:num', (req, res) => {
  Post.deleteOne({ communityNum: req.params.num }).exec()
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })
})

module.exports = router;