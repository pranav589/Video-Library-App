import Video from "../models/VideoModel.js";

// Calculate trending score for a video
function calculateTrendingScore(video, maxViews, maxLikes, maxComments) {
  const maxAge = 30; // Maximum age of videos in days (for normalization)

  // Normalize metrics
  const normalizedViews = video.views / maxViews || 0;
  const normalizedLikes = Number(video.likes.length) / maxLikes || 0;
  const normalizedComments = video.comments / maxComments || 0;

  // Calculate age factor
  const ageInDays =
    (new Date() - new Date(video.createdAt)) / (1000 * 60 * 60 * 24);
  const normalizedAge = ageInDays <= maxAge ? (maxAge - ageInDays) / maxAge : 0; // Avoid negative age
  // Calculate engagement rate
  const engagementRate =
    video.views === 0
      ? 0
      : (Number(video.likes.length) + video.comments) / video.views;
  const normalizedEngagement = engagementRate <= 1 ? engagementRate : 1; // Cap engagement at 1

  // Define weights for each metric
  const weightViews = 0.3;
  const weightLikes = 0.2;
  const weightComments = 0.15;
  const weightAge = 0.2;
  const weightEngagement = 0.15;

  // Calculate weighted sum
  const trendingScore =
    normalizedViews * weightViews +
    normalizedLikes * weightLikes +
    normalizedComments * weightComments +
    normalizedAge * weightAge +
    normalizedEngagement * weightEngagement;

  return { video, trendingScore };
}

export const trendingVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    const videosWithAuthorDetails = await Video.populate(videos, {
      path: "author",
    });
    // Initialize variables to store maximum values
    let maxViews = 0;
    let maxLikes = 0;
    let maxComments = 0;
    const formatData = videosWithAuthorDetails.map((data) => {
      if (data.views > maxViews) {
        maxViews = data.views;
      }
      if (data.likes.length > maxLikes) {
        maxLikes = data.likes.length;
      }
      if (data.comments > maxComments) {
        maxComments = data.comments;
      }
      return calculateTrendingScore(data, maxViews, maxLikes, maxComments);
    });
    const sortData = formatData.sort(function (a, b) {
      return b.trendingScore - a.trendingScore;
    });
    return res.json({
      status: "success",
      Data: sortData,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
