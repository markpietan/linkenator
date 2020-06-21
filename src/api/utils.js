
  function generateUpdateString(fields) {
    const keysArray = Object.keys(fields);
    const psqlArray = keysArray.map(function (e, index) {
      return `"${e}"=$${index + 1}`;
    });
    const psqlString = psqlArray.join(", ");
  
    return psqlString;
  }
  
  module.exports = {
    generateUpdateString,
  };