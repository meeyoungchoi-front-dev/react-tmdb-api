import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css'; // CSS 파일 import

const App = () => {
  const [shows, setShows] = useState([]);
  const [tvShows, setTvShows] = useState('movie'); // 기본값을 "movie"로 설정

  const getShows = () => {
    axios.get(
      `https://api.themoviedb.org/3/discover/${tvShows}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`, // Bearer Token 사용
        }
      }
    ).then((response) => {
      console.log(response.data);
      setShows(response.data.results);
    }).catch(console.log);
  }

  useEffect(() => {
    getShows();
  }, [tvShows]); // 의존성 배열에 tvShows 추가

  // 첫 번째 쇼를 기반으로 이미지 URL, 제목, 설명 설정
  const firstShow = shows[0] || {};
  const imageUrl = firstShow.poster_path ? `https://image.tmdb.org/t/p/original${firstShow.poster_path}` : '';
  
  return (
    <div>
      <button onClick={() => setTvShows("movie")}>Movie</button>
      <button onClick={() => setTvShows("tv")}>TV</button>
      <div style={{ backgroundImage: `url(${imageUrl})` }} className='banner'>
        <div className="banner-text-area">
          <h1 className="text-white">{firstShow.title || firstShow.name}</h1>
          <p className="text-white">{firstShow.overview}</p>
        </div>
      </div>
      <div className="grid-container"> {/* 그리드 컨테이너 추가 */}
        {shows.map((data) => (
          <div className="grid-item" key={data.id}> {/* 그리드 아이템 추가 */}
            <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data.title || data.name} />
            <p className="text-white">{data.title || data.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
