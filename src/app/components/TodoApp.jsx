"use client";
import { useState } from "react";
import Modals from "./Modals";

function TodoApp() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleAddVideo = () => {
    if (selectedVideo) {
      const newVideo = {
        id: Date.now(),
        title: selectedVideo.name,
        file: selectedVideo,
        bookmarked: false,
      };
      setVideos([...videos, newVideo]);
      setSelectedVideo(null);
    }
  };

  const openModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
  };

  const toggleBookmark = (id) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, bookmarked: !video.bookmarked } : video
    );
    setVideos(updatedVideos);
  };

  const toggleShowBookmarkedOnly = () => {
    setShowBookmarkedOnly(!showBookmarkedOnly);
  };

  const filteredVideos = showBookmarkedOnly
    ? videos.filter((video) => video.bookmarked)
    : videos;

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <h1 className="font-medium text-xl font-mono"> Video Library</h1>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Video Upload
          </label>
          <div className="flex gap-4">
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
              <input
                id="file_input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full h-full"
              />
            </div>

            <button
              onClick={handleAddVideo}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
              
            >
              <h2 className={`mb-3 text-xl font-semibold`}>
                Add Video{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </button>
            <button
              onClick={toggleShowBookmarkedOnly}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-xl font-semibold`}>
              {showBookmarkedOnly ? "Show All Videos" : "Show Bookmarked Only"}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </button>
          </div>
        </div>
      </div>
    
      <div className="flex items-center justify-center flex-col ">
        <h2>Videos</h2>
        <ul>
          {filteredVideos.map((video) => (
            <li key={video.id}  className="flex items-center justify-between gap-4 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            >
              {video.title}{" "}
              <div>
                <button onClick={() => openModal(video)} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Play Video</button>
              <button
              className={video.bookmarked ? `text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`:`text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800`}
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(video.id);
              }}
              >
                {video.bookmarked ? "Unbookmark" : "Bookmark"}
              </button>
                </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modals selectedVideo={selectedVideo} closeModal={closeModal} />
      )}
    </div>
  );
}

export default TodoApp;
