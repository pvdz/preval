# Preval test case

# oneper_after.md

> Normalize > Branching > Single branching > Oneper after
>
> One branch per func?

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


## Settled


`````js filename=intro
undefined.length;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.length;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.length;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

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
  const i = `string` == h;
  if (i) {
    const tmpReturnArg$1 = X_BA(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, true);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$3 = X_BB(a$1, b$1, c$1, d$1, e$1, f$1, g$1, h, false);
    return tmpReturnArg$3;
  }
};
const X_BA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$3 = $$0;
  let b$3 = $$1;
  let c$3 = $$2;
  let d$3 = $$3;
  let e$3 = $$4;
  let f$3 = $$5;
  let g$3 = $$6;
  let h$1 = $$7;
  debugger;
  d$3 = c$3;
  c$3 = 0;
  const tmpReturnArg$5 = X_C(a$3, b$3, c$3, d$3, e$3, f$3, g$3, h$1, true);
  return tmpReturnArg$5;
};
const X_BB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$5 = $$0;
  let b$5 = $$1;
  let c$5 = $$2;
  let d$5 = $$3;
  let e$5 = $$4;
  let f$5 = $$5;
  let g$5 = $$6;
  let h$3 = $$7;
  debugger;
  const j = 2147483647 < c$5;
  if (j) {
    const tmpReturnArg$7 = X_BBA(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$3);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = X_BBB(a$5, b$5, c$5, d$5, e$5, f$5, g$5, h$3);
    return tmpReturnArg$9;
  }
};
const X_BBA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$7 = $$0;
  let b$7 = $$1;
  let c$7 = $$2;
  let d$7 = $$3;
  let e$7 = $$4;
  let f$7 = $$5;
  let g$7 = $$6;
  let h$5 = $$7;
  debugger;
  c$7 = 2147483647;
  const tmpReturnArg$11 = X_BBC(a$7, b$7, c$7, d$7, e$7, f$7, g$7, h$5, false, true);
  return tmpReturnArg$11;
};
const X_BBB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$9 = $$0;
  let b$9 = $$1;
  let c$9 = $$2;
  let d$9 = $$3;
  let e$9 = $$4;
  let f$9 = $$5;
  let g$9 = $$6;
  let h$7 = $$7;
  debugger;
  const k = -2147483648 > c$9;
  if (k) {
    c$9 = -2147483648;
  } else {
  }
  const tmpReturnArg$13 = X_BBC(a$9, b$9, c$9, d$9, e$9, f$9, g$9, h$7);
  return tmpReturnArg$13;
};
const X_BBC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
  let a$11 = $$0;
  let b$11 = $$1;
  let c$11 = $$2;
  let d$11 = $$3;
  let e$11 = $$4;
  let f$11 = $$5;
  let g$11 = $$6;
  let h$9 = $$7;
  debugger;
  const tmpReturnArg$15 = X_C(a$11, b$11, c$11, d$11, e$11, f$11, g$11, h$9, false);
  return tmpReturnArg$15;
};
const X_C = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
  let a$13 = $$0;
  let b$13 = $$1;
  let c$13 = $$2;
  let d$13 = $$3;
  let e$13 = $$4;
  let f$13 = $$5;
  let g$13 = $$6;
  let h$11 = $$7;
  let i$1 = $$8;
  debugger;
  let l = +c$13;
  const m = isNaN(l);
  if (m) {
    const n = a$13.length;
    l = n - 0;
    const tmpReturnArg$17 = $(a$13, b$13, c$13, d$13, e$13, f$13, g$13, h$11, i$1, l, m);
    return tmpReturnArg$17;
  } else {
    return undefined;
  }
};
X();
`````


## Todos triggered


- (todo) fixme: spyless vars and labeled nodes


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
