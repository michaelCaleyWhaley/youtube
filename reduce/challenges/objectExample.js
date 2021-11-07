// return an object containing only true boolean values

function sortData(data) {
  const output = Object.keys(data).reduce((prevValue, currentValue) => {
    if (data[currentValue] === true) {
      return { ...prevValue, [currentValue]: data[currentValue] };
    }
    return prevValue;
  }, {});
  return output;
}

export default sortData;
