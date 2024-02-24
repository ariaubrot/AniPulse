import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/ErrorPage/Error";
import playIcon from "../../assets/playIcon.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";

import ReactPlayer from "react-player/lazy";
import Player from "../../components/VideoPlayer/Player";
import "./style.css";

const Stream = () => {
  const { watchId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [epLoading, setEpLoading] = useState(true);
  const [error, setError] = useState(null);
  const [epError, setEpError] = useState(null);
  const [episodeId, setEpisodeId] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);

  const [videoData, setVideoData] = useState([]);
  const [animeTitle, setAnimeTitle] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState([]);
  const location = useLocation();

  const newAnimeId = watchId.split("-").slice(0, -2);
  const newAnimeIdVal = newAnimeId.join("-");

  useEffect(() => {
    const fetchEpisodes = async () => {
      setEpLoading(true);
      try {
        const responseEp = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v1/episode/${newAnimeIdVal}`
        );
        const dataEp = await responseEp.json();
        setEpisodeData(dataEp.episodes.map((item) => item));
        setEpisodeId(dataEp.episodes.map((item) => item.id));

        setEpLoading(false);
      } catch {
        setEpError(true);
        setEpLoading(false);
      }
    };

    const fetchVideos = async () => {
      setIsLoading(true);

      try {
        const responseVideo = await fetch(
          `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${watchId}`
        );
        const dataVideo = await responseVideo.json();
        setVideoData(dataVideo);
        setVideoThumbnail(dataVideo.stream.tracks.file);
        console.log(dataVideo.stream.tracks.file);
        setAnimeTitle(
          `${dataVideo.info.title} Episode ${dataVideo.info.episode}`
        );
        document.title = `${dataVideo.info.title} Episode ${dataVideo.info.episode} - AniPulse`;
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchEpisodes();
    fetchVideos();
  }, []);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Update video URL based on the current location (pathname)
  const fetchNewVideoUrl = async (episodeName) => {
    setLoading(true);
    try {
      const responseVideo = await fetch(
        `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${episodeName}`
      );
      const dataVideo = await responseVideo.json();
      const data = dataVideo;
      setCurrentUrl(data.stream.multi.main.url);
      setLoading(false);
    } catch {
      setErr(true);
      setLoading(false);
    }
  };

  const updateVideoUrl = () => {
    const episodeName = location.pathname.split("/").pop(); // Extract episode name from the URL
    fetchNewVideoUrl(episodeName);
  };

  // Call updateVideoUrl when the component mounts and when the location changes
  useEffect(() => {
    updateVideoUrl();
  }, [location.pathname]);

  // console.log(videoData.stream.multi.main.url);

  return (
    <Box>
      <Navbar />
      <Box background="var(--primary-background-color)">
        <Box px={{ base: "20px", lg: "80px", xl: "100px" }} py="20px">
          {/* BreadCrumb Links */}
          <Breadcrumb mb="20px">
            <BreadcrumbItem
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--text-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              isCurrentPage
              fontSize={{ base: "15.13px", lg: "18.75px" }}
              lineHeight={{ base: "24px", lg: "30px" }}
              letterSpacing="0.5px"
              color="var(--accent-color)"
              _hover={{ color: "var(--link-hover-color)" }}
            >
              <BreadcrumbLink>{`Stream / ${animeTitle}`}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Anime Stream */}
          <Box>
            <Box className="player-wrapper" width="100%" height="100%">
              <Grid
                gridTemplateColumns="repeat(6, 1fr)"
                gap={{ base: "30px 0", xl: "0 20px" }}
              >
                {/* Anime Video */}
                <GridItem
                  colSpan={{ base: 6, xl: 4 }}
                  h={{
                    base: "100%",
                    // sm: "350px",
                    // md: "400px",
                    xl: "450px!important",
                    "2xl": "600px!important",
                  }}
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
                  borderRadius="10px"
                  pos="relative"
                >
                  {loading && (
                    <Error
                      // msg="Still Loading"
                      loadingState={loading}
                      height="100%"
                      width="100%"
                      // error={err}
                      pos="absolute"
                      top="0"
                      left="0"
                      bg="#191919"
                      spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
                      spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
                    />
                  )}
                  {err && (
                    <Error
                      msg="Still Working"
                      height="100%"
                      width="100%"
                      error={err}
                      pos="absolute"
                      top="0"
                      left="0"
                      bg="#191919"
                      spinnerH={{ base: "50px", md: "80px", lg: "100px" }}
                      spinnerW={{ base: "50px", md: "80px", lg: "100px" }}
                    />
                  )}

                  <ReactPlayer
                    light={true}
                    controls={true}
                    // playsinline
                    loop={true}
                    playIcon={<Image src={playIcon} />}
                    url={currentUrl}
                    width="100%"
                    height="100%"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    playing={true}
                  />
                </GridItem>
                <GridItem
                  colSpan={{ base: 6, xl: 2 }}
                  h={{
                    base: "250px",
                    sm: "300px",
                    md: "350px",
                    lg: "450px",
                    "2xl": "600px",
                  }}
                  overflowY="scroll"
                  boxShadow="0 0 10px 0 rgba(0,0,0,0.3)"
                  borderRadius="10px"
                >
                  <Box
                    w="100%"
                    bg="transparent"
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                  >
                    {/* Season box */}
                    <Box width="100%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                        gap="0 10px"
                        cursor="pointer"
                        pos="relative"
                        height="40px"
                        ps="20px"
                      >
                        {/* {epLoading && (
                          <Error
                            loadingState={epLoading}
                            width="100%"
                            height="100%"
                            pos="initial"
                          />
                        )}
                        {epError && (
                          <Error
                            error={epError}
                            msg=""
                            width="100%"
                            height="100%"
                          />
                        )} */}

                        <Text
                          color="var(--text-color)"
                          fontSize="17.58px"
                          lineHeight="24px"
                        >
                          Season 1
                        </Text>
                        <ChevronDownIcon
                          h="18px"
                          w="18px"
                          color="var(--text-color)"
                        />
                      </Box>
                      <Box
                        display={{ base: "flex" }}
                        flexDir={{ base: "column" }}
                        pos="relative"
                      >
                        {epLoading && (
                          <Error
                            loadingState={epLoading}
                            width="100%"
                            height="100%"
                            pos="relative"
                            top="0"
                            left="0"
                            bg="transparent"
                            spinnerH={{ base: "50px" }}
                            spinnerW={{ base: "50px" }}
                          />
                        )}
                        {epError && (
                          <Error
                            error={epError}
                            msg=""
                            width="100%"
                            height="100%"
                            pos="absolute"
                            top="0"
                            left="0"
                            bg="transparent"
                          />
                        )}

                        {(() => {
                          const elements = [];

                          for (let i = 0; i < episodeData.length; i++) {
                            const item = episodeData[i];
                            const epArray = item.id.split("-");

                            const newItemID = `Episode ${epArray.pop()}`;

                            // setEpisodeId(item.id);

                            // Use item properties in JSX
                            elements.push(
                              <Link
                                key={item[i]}
                                to={`/watch/${item.id}`}
                                className={
                                  location.pathname == `/watch/${item.id}`
                                    ? "episode active"
                                    : "episode"
                                }
                              >
                                {newItemID}
                              </Link>
                            );
                          }

                          return elements;
                        })()}
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Stream;
