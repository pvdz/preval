// Try base cases

$(1);
try {
  $(2);
} catch {
  $('fail');
} finally {
  $(3);
}
$(4);
