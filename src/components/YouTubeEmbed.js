import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import TheMovieDbApiService from '../services/themoviedbApi.service';
import { useEffect, useState } from 'react';

const YouTubeEmbed = ({ movieDbId, type, width = 720, height = 512 }) => {
  const [youtubeId, setYoutubeId] = useState('');

  const handleOnReady = (event) => {
    console.log('handle on ready');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const getYouTubeId = async (movieId) => {
    const response = await TheMovieDbApiService.getVideos(type, movieDbId);
    const search = response.results.find(movie => movie.site === 'YouTube');
    
    if (search) {
      setYoutubeId(search.key);
    }
  }

  useEffect(() => {
    getYouTubeId(movieDbId);
  }, [movieDbId]);

  return (
    youtubeId &&
      <YouTube
        videoId={youtubeId}
        opts={{ height, width, playerVars: { autoplay: 0 } }}
        onReady={handleOnReady}
      />
  )
}

YouTubeEmbed.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default YouTubeEmbed;