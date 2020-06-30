
//This module shortens a string to the number of words specified by "limit". "source" is the string to be truncated.

module.exports = function(source, limit) {
  if (!source || !limit) return;
  source = source.trim();
  source = source.split(' ').slice(0, limit);
  return source.join(' ') + " ...";
};
