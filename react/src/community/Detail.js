import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import styled from 'styled-components';

const DetailWrap = styled.div`
  width: 100%;
  padding: 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.02);
`
const BtnSet = styled.div`
  margin-top: 20px;
`

function Detail() {
  const user = useSelector(store => store.user);
  console.log(user);
  const navigate = useNavigate();
  const params = useParams();
  const [Detail, setDetail] = useState({});
  const [Loaded, setLoaded] = useState(false);

  const item = {
    num: params.num
  }

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하겠습니다.')) return;

    axios.delete(`/api/community/delete/${item.num}`)
      .then(res => {
        if (res.data.success) {
          alert('게시글이 삭제되었습니다.');
          navigate('/list');
        } else {
          alert('게시글 삭제에 실패했습니다.');
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get(`/api/community/detail?num=${item.num}`)
      .then(res => {
        if (res.data.success) {
          setDetail(res.data.detail);
        }
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    Object.keys(Detail).length !== 0 && setLoaded(true);
    console.log(Detail)
  }, [Detail])


  return (
    <Layout name={'Detail'}>
      {Detail && Loaded ? (
        <>
          <DetailWrap>
            <h2>{Detail.title}</h2>
            <p>{Detail.content}</p>
            {Detail.createdAt === Detail.updatedAt ? <p>Posted: {Detail.createdAt.split('T')[0]}</p> : <p>Updated: {Detail.updatedAt.split('T')[0]}</p>}
          </DetailWrap>

          {user.uid === Detail.writer.uid && (
            <BtnSet>
              <button><Link to={`/edit/${item.num}`}>Edit</Link></button>
              <button onClick={handleDelete}>Delete</button>
            </BtnSet>
          )}
        </>
      )
        :
        <p>Loading...</p>
      }
    </Layout>
  );
}

export default Detail;