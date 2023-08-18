import Video from "../models/VideoModel.js";

export const autoCompleteSearch = async (req, res) => {
  try {
    const term = req.query;
    if (!term.query) return null;
    let result = await Video.aggregate([
      {
        $search: {
          index: "default",
          autocomplete: {
            query: `${term?.query}`,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      {
        $limit: 3,
      },
    ]);
    return res.json({
      status: "success",
      Data: result,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
