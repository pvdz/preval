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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
