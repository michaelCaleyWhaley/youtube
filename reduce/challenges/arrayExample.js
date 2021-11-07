// return an array of objects with the following conditions
// gif or video at the first index
// if there is a video, then remove gif
// never more than one video or gif

function removeDupeType(prevValue) {
  if (prevValue[0].type === "gif" || prevValue[0].type === "video") {
    prevValue.splice(0, 1);
  }
}

function sortData(data) {
  const output = data.reduce((prevValue, currentValue) => {
    if (
      currentValue.type === "gif" &&
      prevValue[0]?.type !== "gif" &&
      prevValue[0]?.type !== "video"
    ) {
      return [currentValue, ...prevValue];
    }

    if (currentValue.type === "video" && prevValue[0]?.type !== "video") {
      removeDupeType(prevValue);
      return [currentValue, ...prevValue];
    }

    if (currentValue.type === "video" || currentValue.type === "gif") {
      return prevValue;
    }

    return [...prevValue, currentValue];
  }, []);
  return output;
}

export default sortData;
