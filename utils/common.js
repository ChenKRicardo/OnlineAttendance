const toZero = (n) => {
  if(n < 10){
    return '0' + n;
  }
  else{
    return '' + n;
  }
}

const toDays = (n) => {
  let year = new Date().getFullYear()
  switch( n ){
    case 1: 
    case 3: 
    case 5: 
    case 7: 
    case 8: 
    case 10: 
    case 12: 
      return 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
    case 2:
      if( year%400 === 0 || ( year%4 === 0 && year%100 !== 0 ) ){
        return 29;
      } 
      else{
        return 28;
      }
  }
}

module.exports = {
  toZero,
  toDays
};