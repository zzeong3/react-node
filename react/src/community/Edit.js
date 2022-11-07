import styled from 'styled-components';
import Layout from "../common/Layout";
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
 
const BtnSet = styled.div `
    margin-top:20px;
`

function Edit() {
    const navigate = useNavigate();
    const params = useParams();
    const [Detail, setDetail] = useState({});
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');

    const handleUpdate = () => {
        if(Title.trim() === '' || Content.trim() === '') return alert('모든 항목을 입력하세요.')
        const item = {
            title: Title,
            content: Content,
            num: params.num
        }

        axios.post('/api/community/edit', item)
            .then(res=>{
                if(res.data.success) {
                    alert('글 수정이 완료되었습니다.');
                    navigate(`/detail/${params.num}`)
                }else {
                    alert('글 수정에 실패했습니다.')
                }
            })
            .catch(err=>console.log(err));
    }

    useEffect(()=>{
        const item = {num : params.num};
        axios.post('/api/community/detail', item)
            .then((res)=>{
                if(res.data.success) {
                    console.log(res.data.detail);
                    setDetail(res.data.detail);
                }
            })
            .catch(err=>console.log(err));
    },[])

    useEffect(()=>{
        setTitle(Detail.title);
        setContent(Detail.content);
    },[Detail])

    return (
        <Layout name={'Edit'}>
            <label htmlFor="title">Title</label>
            <input type="text" value={Title || ''} id='title' onChange={e=>setTitle(e.target.value)} />

            <label htmlFor="content">content</label>
            <textarea name="content" id="content" cols="30" rows="4" value={Content || ''} onChange={e=>setContent(e.target.value)}></textarea>

            <BtnSet>
                <button onClick={()=>navigate(-1)}>cancle</button>
                <button onClick={handleUpdate}>update</button>
            </BtnSet>
        </Layout>
    )
}

export default Edit
