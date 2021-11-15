import React, { useEffect, useState } from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import HelmetCustom from "../HelmetCustom";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import "./_VideoMetaData.scss";

const VideoMetaData = ({ video, videoId }) => {
  const [snippet, setSnippet] = useState({});
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    if (video && video.snippet && video.statistics) {
      setSnippet(video.snippet);
      setStatistics(video.statistics);
    }
  }, [video]);

  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const { channel, subscriptionStatus } = useSelector(
    (state) => state.channelDetails
  );
  const dispatch = useDispatch();
  console.log(channel, subscriptionStatus);
  const { snippet: channelSnippet, statistics: channelStatistics } = channel;

  useEffect(() => {
    if (channelId) {
      dispatch(getChannelDetails(channelId));
      dispatch(checkSubscriptionStatus(channelId));
    }
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <HelmetCustom title={title} description={description} />
      <div className="videoMetaData__top">
        <h5>{title}</h5>

        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views
            {moment(publishedAt).fromNow()}
          </span>
        </div>

        <div>
          <span>
            <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
          </span>
          <span>
            <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
          </span>
        </div>
      </div>

      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt="profile-img"
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column">
            <span className="mr-3">{channelTitle}</span>
            <span className="mr-3">
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button className={`btn border-0 p-2 m-2`}>
          {/*subscriptionStatus && "btn-gray"*/}
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="videoMetaData__description">
        {
          <ShowMoreText
            lines={3}
            more="SHOW MORE"
            less="SHOW LESS"
            anchorClass="showMoreText"
            expanded={false}
          >
            {description}
          </ShowMoreText>
        }
      </div>
    </div>
  );
};

export default VideoMetaData;
