import React from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function DateFormatter({ date }) {
  return date && <ReactTimeAgo date={date} locale="en-US" />;
}

export default DateFormatter;
