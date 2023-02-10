// import css
import "./Video.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// import components
import Navigation from "components/Navigation";
import VideoPlayer from "components/VideoPlayer";
import { useGlobalContext } from "context/context";

// import from React
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import axios from "axios";

export default function Video(props) {
  const [video, setVideo] = useState(null);
  const {
    loadingState,
    setLoadingState,
    title,
    setTitle,
    description,
    setDescription,
    author,
    setAuthor,
    authorThumbnails,
    setAuthorThumbnails,
    subCountText,
    setSubCountText,
    likeCount,
    setLikeCount,
    playlists,
    setPlaylists,
    currentPlaylist,
    setCurrentPlaylist,
  } = useGlobalContext();

  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  // let playlistID = searchParams.get('playlistID');
  // console.log("searchParams", playlistID);


  // for (const [key, value] of searchParams) {
  //   console.log(key, value);
  // }

  useEffect(() => {
    setLoadingState(true);
    fetch(`https://inv.riverside.rocks/api/v1/videos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadingState(false);
        setTitle(data.title);
        setDescription(data.description);
        setAuthor(data.author);
        setSubCountText(data.subCountText);
        setLikeCount(data.likeCount);
        setAuthorThumbnails(data.authorThumbnails[2].url);
      });
  }, [id]);

  const downloadVideo = () => {
    console.log("you are in downloadVideo");
    axios
      .get(`/download/${id}`, {
        responseType: "blob",
      })
      .then((res) => setVideo(URL.createObjectURL(new Blob([res.data]))))
      .catch((err) => console.error(err));
  };

  return (
    <div className="Video-Page">
      <Navigation />
      <hr className="break-line"></hr>
      <main>
        <div className="video">
          {loadingState && (
            <Spinner
              className="loading-spin"
              animation="border"
              variant="light"
              role="status"
            />
          )}
          {!loadingState && <VideoPlayer />}
        </div>
        <hr className="break-line"></hr>
        <section className="below-video">
          {!loadingState && <h1>{title}</h1>}
          <hr className="break-line"></hr>
          {!loadingState && (
            <div className="video-details">
              <div className="channel-details">
                <img src={authorThumbnails} />
                <h3>{author}</h3>
                <h3 className="add-line">{subCountText}</h3>
              </div>
              <div className="channel-details">
                <FontAwesomeIcon
                  className="thumbs-up-icon"
                  icon={faThumbsUp}
                  size="3x"
                />
                <h3 className="add-line">{likeCount}</h3>
              </div>
              <Button
                variant="outline-light"
                className="download-button"
                onClick={downloadVideo}
              >
                Download
              </Button>
            </div>
          )}
          <hr className="break-line"></hr>
          {!loadingState && <div>{description}</div>}
        </section>
      </main>
    </div>
  );
}
