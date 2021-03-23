# Preval test case

# oneper_after4.md

> Normalize > Branching > Single branching > Oneper after4
>
> One branch per func?

## Input

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1
  } else {
    return X_B(a, b, c, d, e, f, g)
  }
}
const X_B = function(a, b, c, d, e, f, g) {
  const h = typeof c;
  const i = 'string' == h;
  if (i) {
    return X_BA (a, b, c, d, e, f, g, h, true)
  } else {
    return X_BB (a, b, c, d, e, f, g, h, false)
  }
}
const X_BA = function (a, b, c, d, e, f, g, h) {
  d = c;
  c = 0;
  return X_C (a, b, c, d, e, f, g, h, true)
}
const X_BB = function (a, b, c, d, e, f, g, h) {
  const j = 2147483647 < c;
  if (j) {
    return X_BBA(a, b, c, d, e, f, g, h)
  } else {
    return X_BBB(a, b, c, d, e, f, g, h)
  }
}
const X_BBA = function (a, b, c, d, e, f, g, h) {
  c = 2147483647;
  return X_BBC (a, b, c, d, e, f, g, h, false, true)
}
const X_BBB = function (a, b, c, d, e, f, g, h) {
  const k = -2147483648 > c;
  if (k) {
    c = -2147483648;
  }
  return X_BBC (a, b, c, d, e, f, g, h)
}
const X_BBC = function (a, b, c, d, e, f, g, h) {
  return X_C (a, b, c, d, e, f, g, h, false)
}
const X_C = function (a, b, c, d, e, f, g, h, i) {
  let l = +c;
  const m = isNaN(l);
  if (m) {
    const n = a.length;
    l = n - false;
    return $(a,b,c,d,e,f,g,h,i,l,m);;
  }
}
X();
`````

## Pre Normal

`````js filename=intro
const X = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    return X_B(a, b, c, d, e, f, g);
  }
};
const X_B = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
  let a$1 = $$0;
  let b$1 = $$1;
  let c$1 = $$2;
  let d$1 = $$3;
  let e$1 = $$4;
  let f$1 = $$5;
  let g$1 = $$6;
  debugger;
  const h = typeof c$1;
  const i = 'string' == h;
  if (i) {
    return X_BA(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, true);
  } else {
    return X_BB(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, false);
  }
};
const X_BA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$2 = $$0;
  let b$2 = $$1;
  let c$2 = $$2;
  let d$2 = $$3;
  let e$2 = $$4;
  let f$2 = $$5;
  let g$2 = $$6;
  let h$1 = $$7;
  debugger;
  d$2 = c$2;
  c$2 = 0;
  return X_C(a$2, b$2, c$2, d$2, e$2, f$2, g$2, h$1, true);
};
const X_BB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$3 = $$0;
  let b$3 = $$1;
  let c$3 = $$2;
  let d$3 = $$3;
  let e$3 = $$4;
  let f$3 = $$5;
  let g$3 = $$6;
  let h$2 = $$7;
  debugger;
  const j = 2147483647 < c$3;
  if (j) {
    return X_BBA(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
  } else {
    return X_BBB(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
  }
};
const X_BBA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$4 = $$0;
  let b$4 = $$1;
  let c$4 = $$2;
  let d$4 = $$3;
  let e$4 = $$4;
  let f$4 = $$5;
  let g$4 = $$6;
  let h$3 = $$7;
  debugger;
  c$4 = 2147483647;
  return X_BBC(a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$3, false, true);
};
const X_BBB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$5 = $$0;
  let b$5 = $$1;
  let c$5 = $$2;
  let d$5 = $$3;
  let e$5 = $$4;
  let f$5 = $$5;
  let g$5 = $$6;
  let h$4 = $$7;
  debugger;
  const k = -2147483648 > c$5;
  if (k) {
    c$5 = -2147483648;
  }
  return X_BBC(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4);
};
const X_BBC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$6 = $$0;
  let b$6 = $$1;
  let c$6 = $$2;
  let d$6 = $$3;
  let e$6 = $$4;
  let f$6 = $$5;
  let g$6 = $$6;
  let h$5 = $$7;
  debugger;
  return X_C(a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$5, false);
};
const X_C = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
  let a$7 = $$0;
  let b$7 = $$1;
  let c$7 = $$2;
  let d$7 = $$3;
  let e$7 = $$4;
  let f$7 = $$5;
  let g$7 = $$6;
  let h$6 = $$7;
  let i$1 = $$8;
  debugger;
  let l = +c$7;
  const m = isNaN(l);
  if (m) {
    const n = a$7.length;
    l = n - false;
    return $(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$6, i$1, l, m);
  }
};
X();
`````

## Normalized

`````js filename=intro
const X = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const tmpReturnArg = X_B(a, b, c, d, e, f, g);
    return tmpReturnArg;
  }
};
const X_B = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
  let a$1 = $$0;
  let b$1 = $$1;
  let c$1 = $$2;
  let d$1 = $$3;
  let e$1 = $$4;
  let f$1 = $$5;
  let g$1 = $$6;
  debugger;
  const h = typeof c$1;
  const i = 'string' == h;
  if (i) {
    const tmpReturnArg$1 = X_BA(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, true);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$2 = X_BB(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, false);
    return tmpReturnArg$2;
  }
};
const X_BA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$2 = $$0;
  let b$2 = $$1;
  let c$2 = $$2;
  let d$2 = $$3;
  let e$2 = $$4;
  let f$2 = $$5;
  let g$2 = $$6;
  let h$1 = $$7;
  debugger;
  d$2 = c$2;
  c$2 = 0;
  const tmpReturnArg$3 = X_C(a$2, b$2, c$2, d$2, e$2, f$2, g$2, h$1, true);
  return tmpReturnArg$3;
};
const X_BB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$3 = $$0;
  let b$3 = $$1;
  let c$3 = $$2;
  let d$3 = $$3;
  let e$3 = $$4;
  let f$3 = $$5;
  let g$3 = $$6;
  let h$2 = $$7;
  debugger;
  const j = 2147483647 < c$3;
  if (j) {
    const tmpReturnArg$4 = X_BBA(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = X_BBB(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
    return tmpReturnArg$5;
  }
};
const X_BBA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$4 = $$0;
  let b$4 = $$1;
  let c$4 = $$2;
  let d$4 = $$3;
  let e$4 = $$4;
  let f$4 = $$5;
  let g$4 = $$6;
  let h$3 = $$7;
  debugger;
  c$4 = 2147483647;
  const tmpReturnArg$6 = X_BBC(a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$3, false, true);
  return tmpReturnArg$6;
};
const X_BBB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$5 = $$0;
  let b$5 = $$1;
  let c$5 = $$2;
  let d$5 = $$3;
  let e$5 = $$4;
  let f$5 = $$5;
  let g$5 = $$6;
  let h$4 = $$7;
  debugger;
  const k = -2147483648 > c$5;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
    let a$8 = $$0;
    let b$8 = $$1;
    let c$8 = $$2;
    let d$8 = $$3;
    let e$8 = $$4;
    let f$8 = $$5;
    let g$8 = $$6;
    let h$7 = $$7;
    let k$1 = $$8;
    debugger;
    c$8 = -2147483648;
    const tmpReturnArg$7 = tmpBranchingC(a$8, b$8, c$8, d$8, e$8, f$8, g$8, h$7, k$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
    let a$9 = $$0;
    let b$9 = $$1;
    let c$9 = $$2;
    let d$9 = $$3;
    let e$9 = $$4;
    let f$9 = $$5;
    let g$9 = $$6;
    let h$8 = $$7;
    let k$2 = $$8;
    debugger;
    const tmpReturnArg$8 = tmpBranchingC(a$9, b$9, c$9, d$9, e$9, f$9, g$9, h$8, k$2);
    return tmpReturnArg$8;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
    let a$10 = $$0;
    let b$10 = $$1;
    let c$10 = $$2;
    let d$10 = $$3;
    let e$10 = $$4;
    let f$10 = $$5;
    let g$10 = $$6;
    let h$9 = $$7;
    let k$3 = $$8;
    debugger;
    const tmpReturnArg$9 = X_BBC(a$10, b$10, c$10, d$10, e$10, f$10, g$10, h$9);
    return tmpReturnArg$9;
  };
  if (k) {
    const tmpReturnArg$10 = tmpBranchingA(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4, k);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4, k);
    return tmpReturnArg$11;
  }
};
const X_BBC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$6 = $$0;
  let b$6 = $$1;
  let c$6 = $$2;
  let d$6 = $$3;
  let e$6 = $$4;
  let f$6 = $$5;
  let g$6 = $$6;
  let h$5 = $$7;
  debugger;
  const tmpReturnArg$12 = X_C(a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$5, false);
  return tmpReturnArg$12;
};
const X_C = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
  let a$7 = $$0;
  let b$7 = $$1;
  let c$7 = $$2;
  let d$7 = $$3;
  let e$7 = $$4;
  let f$7 = $$5;
  let g$7 = $$6;
  let h$6 = $$7;
  let i$1 = $$8;
  debugger;
  let l = +c$7;
  const m = isNaN(l);
  if (m) {
    const n = a$7.length;
    l = n - false;
    const tmpReturnArg$13 = $(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$6, i$1, l, m);
    return tmpReturnArg$13;
  }
};
X();
`````

## Output

`````js filename=intro
undefined.length;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
