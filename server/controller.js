const XLSX = require("xlsx");

module.exports.fetchData = function () {
  let workbook = XLSX.readFile("./public/SheetJS.xlsx");
  let sheet_name_list = workbook.SheetNames;
  let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(xlData);
  //processData(xlData);
  return xlData;
};
