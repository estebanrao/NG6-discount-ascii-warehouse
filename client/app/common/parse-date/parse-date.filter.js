import moment from 'moment';

let parseDateFilter = function () {

  return function(date) {
    // Ensure that the passed in data is a date
    if(!moment(date).isValid()) {
      return date;
    } else {
      const now = moment();
      const faceDate = moment(date);
      const diff = now.diff(faceDate, 'days');

      if (diff <= 7) {
        return moment(faceDate).fromNow();
      } else {
        return moment(faceDate).format('LLLL');
      }
    }
  }

};

export default parseDateFilter;
