// Try base cases

$(1);
try {
  $(2);
} catch (e) {
  $('fail');
} finally {
  $(3);
}
$(4);
