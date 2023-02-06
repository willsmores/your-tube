import axios from "axios";
import { React, useEffect, useState } from "react";
import YouTube from "react-youtube";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

// CSS Imports ///////////////////////////////

import "bootstrap/dist/css/bootstrap.min.css";
import "App.css";
import "Results.css";

////////////////////////////////////////////////////

// Import components
import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import Footer from "components/Footer";

export default function App() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios
      .get("/api/status")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus({ error: err.message });
      });
  }, []);

  const opts = {
    playerVars: {
      rel: 0,
    },
  };

  const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  const videoId = "MWQkvbe5nyY";

  const getVideoSource = async function (videoId) {
    const response = await fetch(invidiousEndpoint + videoId);
    console.log("response: ", response);
    const data = await response.json();
    return data.files[0].url;
  };

  // Videoplayer (not in use right now)
  const VideoPlayer = ({ videoId }) => {
    const [source, setSource] = useState("");

    useEffect(() => {
      getVideoSource(videoId).then((source) => {
        setSource(source);
      });
    }, [videoId]);

    return <video controls={true} src={source} style={{ width: "100%" }} />;
  };

  // const API_KEY = "AIzaSyBZ9Mr5A7JlJO2sqYsG09v1UR1TCKtkRk8";
  // const searchTerm = "pitch meeting";

  // fetch(`https://invidio.us/api/v1/search?q=${searchTerm}`, { mode: "no-cors" })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));

  // fetch(
  //   `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&type=video&key=${API_KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log("data ====", data);
  //     // console.log("item ====", data.items[0]);
  //     // console.log("full ====", data.items[0].snippet.title);

  //     // .items[0].snippet.title

  //   })
  //   .catch((error) => console.error(error));

  return (
    <div className="App">
      <Navigation />
      <hr className="break-line"></hr>
      <MainContent />
      <Footer />

      {/* <div>
        <section>
          {!status.error && (
            <>
              API Version: <code>{status.version}</code>
            </>
          )}
          {status.error && (
            <>
              API Error: <code>{status.error}</code>
            </>
          )}
        </section>
      </div> */}

      <div id="search-results">
        <article className="video-result">
          <a href="/">
          <div className="preview">
            <img
              className="video-header"
              src="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
              alt="header"
            ></img>
            <p className="video-title text-white">Very cool video title</p>
            <FontAwesomeIcon className="plus-icon" icon={faPlusCircle} size="3x" />
          </div>
          </a>
        </article>
      </div>
    </div>
  );
}
