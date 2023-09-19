const Handlebars = require('handlebars');

Handlebars.registerHelper('ge', function (a, b, options) {
  return a >= b ? options.fn(this) : options.inverse(this);
});

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  // greater than or equal to

  
};
