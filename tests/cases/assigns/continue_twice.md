// Continue to outer loop

{
  let x = 10;
  foo: while (true) {
    while (true) {
      if ($(x)) {
        continue foo;
      } else {
        x = 20;
      }
      $(x);
    }
    $(x);
    x = 40;
  }
  $(x);
}
