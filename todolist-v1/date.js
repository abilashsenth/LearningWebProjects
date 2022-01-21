exports.getDate = function () {
  const date = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const day = date.toLocaleDateString("en-US", options);
  return day;
};

exports.getDay = function () {
  const date = new Date();
  const options = { weekday: "long" };
  const day = date.toLocaleDateString("en-US", options);
  return day;
};
