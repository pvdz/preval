// This is the minimal case of a regression, probably caused by the return and/or the transform

function f() {
  while (true) {
    const a = 1
    while (0 <= a) {
      $(1);
    }
    break;
  }
}

f();
