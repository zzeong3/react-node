import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {
	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');

	const handeCreate = () => {
		const item = {title : Tit, content: Con};

		axios.post('/api/create', item)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			})
	}

	return (
		<section>Hello2
		<label htmlFor="tit"></label><br />
		<input type="text" id ='tit' value={Tit} onChange={e => setTit(e.target.value)} />

		<label htmlFor="con">Content</label><br />
		<textarea name="con" id="con" cols="30" rows="3" value={Con} onChange={e => setCon(e.target.value)}></textarea><br />
		<button onClick={handeCreate}>SEND</button>
		</section>
	);
}

export default App;
