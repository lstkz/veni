export default () => (data) => {
  if (data.value == null) {
    return {
      stop: true,
      value: data.value,
    };
  }
  return undefined;
};
