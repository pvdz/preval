# Preval test case

# oneper_after.md

> Normalize > Branching > Single branching > Oneper after
>
> One branch per func?

#TODO

This is the example input

```js
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 0;
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        }
      }
    }
    let l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      l = n - 1;
      $(a,b,c,d,e,f,g,h,i,l,m);
    }
  }
}
```

The test is what that would roughly translate to for single branching functions

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

## Normalized

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const tmpReturnArg = X_B(a, b, c, d, e, f, g);
    return tmpReturnArg;
  }
};
const X_B = function (a$1, b$1, c$1, d$1, e$1, f$1, g$1) {
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
const X_BA = function (a$2, b$2, c$2, d$2, e$2, f$2, g$2, h$1) {
  d$2 = c$2;
  c$2 = 0;
  const tmpReturnArg$3 = X_C(a$2, b$2, c$2, d$2, e$2, f$2, g$2, h$1, true);
  return tmpReturnArg$3;
};
const X_BB = function (a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2) {
  const j = 2147483647 < c$3;
  if (j) {
    const tmpReturnArg$4 = X_BBA(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = X_BBB(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
    return tmpReturnArg$5;
  }
};
const X_BBA = function (a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$3) {
  c$4 = 2147483647;
  const tmpReturnArg$6 = X_BBC(a$4, b$4, c$4, d$4, e$4, f$4, g$4, h$3, false, true);
  return tmpReturnArg$6;
};
const X_BBB = function (a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4) {
  const k = -2147483648 > c$5;
  if (k) {
    c$5 = -2147483648;
  }
  const tmpReturnArg$7 = X_BBC(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4);
  return tmpReturnArg$7;
};
const X_BBC = function (a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$5) {
  const tmpReturnArg$8 = X_C(a$6, b$6, c$6, d$6, e$6, f$6, g$6, h$5, false);
  return tmpReturnArg$8;
};
const X_C = function (a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$6, i$1) {
  let l = +c$7;
  const m = isNaN(l);
  if (m) {
    const n = a$7.length;
    l = n - false;
    const tmpReturnArg$9 = $(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$6, i$1, l, m);
    return tmpReturnArg$9;
  }
};
X();
`````

## Output

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const tmpReturnArg = X_B(a, b, c, d, e, f, g);
    return tmpReturnArg;
  }
};
const X_B = function (a$1, b$1, c$1, d$1, e$1, f$1, g$1) {
  const h = typeof c$1;
  const i = 'string' == h;
  if (i) {
    const tmpReturnArg$1 = X_C(a$1, b$1, 0, c$1, e$1, f$1, g$1, h, true);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$2 = X_BB(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, false);
    return tmpReturnArg$2;
  }
};
const X_BB = function (a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2) {
  const j = 2147483647 < c$3;
  if (j) {
    const tmpReturnArg$4 = X_C(a$3, b$3, 2147483647, d$3, e$3, f$3, g$3, h$2, false);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = X_BBB(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$2);
    return tmpReturnArg$5;
  }
};
const X_BBB = function (a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4) {
  const k = -2147483648 > c$5;
  if (k) {
    c$5 = -2147483648;
  }
  const tmpReturnArg$7 = X_C(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$4, false);
  return tmpReturnArg$7;
};
const X_C = function (a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$6, i$1) {
  const l = +c$7;
  const m = isNaN(l);
  if (m) {
    const n = a$7.length;
    const SSA_l = n - false;
    const tmpReturnArg$9 = $(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$6, i$1, SSA_l, m);
    return tmpReturnArg$9;
  }
};
X();
`````

## Globals

BAD@! Found 1 implicit global bindings:

isNaN

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same