const express = require('express');
const router =express.Router();

const {Post} = require('../model/postSchema');
// 스키마 모델을 불러오면 자동으로 mongoDB에 빈 컬렉션이 추가됨
// 카운터 컬렉션에 초기 데이터가 들어갈 첫 document를 몽고DB상에서 직접 생성
// {name : 'counter', communityNum:1}
const {Counter} = require('../model/counterSchema');

//create 리액트로 부터 받은 요청처리
router.post('/create', (req, res) => {
    //Counter  모델로부터 Community값을 찾아서 프론트에서 전달받은 데이터에 추가
    //이때 Counter 모델에 findOne메서드로 찾을 document의 조건 설정

      Counter.findOne({ name: 'counter' })
      .exec()
      .then(doc => {
        //기존 프론트에서 받은 데이터에 방금 파라미터로 전달받은 doc의 communityNum값을 추가 적용
        const PostModel = new Post({
          title: req.body.title,
          content: req.body.content,
          communityNum: doc.communityNum
        });

        //위에서 생성된 모델 인스턴스를 DB에 저장
        PostModel.save()
          .then(() => {
            //성공적으로 Post모델이 저장되면 기존 카운터의 communityNum값을 1증가해서 document업데이트
            //update에서 자주쓰는 수정방식 3가지 $inc(기존값증가), $dec(기존값감소), $set(새로운값으로 변경)
            Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
              .then(() => {
                res.json({ success: true })
              })
          })
      })
      .catch(err => console.log(err))

});

//read 글을 불러오는
router.post('/read', (req, res) => {
    Post.find()
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
  router.post('/detail', (req, res) => {
    Post.findOne({ communityNum: req.body.num }).exec()
      .then(doc => {
        res.json({ success: true, detail: doc });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      })
  });


  //edit
  router.post('/edit', (req, res)=>{
    const temp = {
      title : req.body.content,
      content : req.body.content
    }

    Post.updateOne({communityNum: req.body.num}, {$set: temp})
      .exec()
      .then(()=>{
        res.json({success: true})
      })
      .catch(err=>{
        console.log(err)
        res.json({success:false})
      })
  })
module.exports = router;