# Preval test case

# sequence.md

> Normalize > While > Sequence
>
> Test should be normalized

## Input

`````js filename=intro
let x = 1;
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x?.x(x))) {}
`````

## Settled


`````js filename=intro
let tmpClusterSSA_x /*:unknown*/ = NaN.x;
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_x == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = tmpClusterSSA_x.x(tmpClusterSSA_x);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x ** 0;
    tmpClusterSSA_x = NaN.x;
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpIfTest$4 /*:boolean*/ = tmpClusterSSA_x == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = tmpClusterSSA_x.x(tmpClusterSSA_x);
      tmpIfTest$2 = tmpChainElementCall$1;
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_x = NaN.x;
let tmpIfTest = undefined;
if (!(tmpClusterSSA_x == null)) {
  tmpIfTest = tmpClusterSSA_x.x(tmpClusterSSA_x);
}
if (tmpIfTest) {
  while (true) {
    tmpClusterSSA_x ** 0;
    tmpClusterSSA_x = NaN.x;
    let tmpIfTest$2 = undefined;
    if (!(tmpClusterSSA_x == null)) {
      tmpIfTest$2 = tmpClusterSSA_x.x(tmpClusterSSA_x);
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
while (((x = x * `str`), (x = x * 8), (x = x), (x = x * x), (x = x.x), x?.x(x))) {}
`````

## Normalized


`````js filename=intro
let x = 1;
while (true) {
  x * 0;
  x = NaN;
  x = x * 8;
  x = x * x;
  x = x.x;
  let tmpIfTest = undefined;
  const tmpChainRootProp = x;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootProp.x(x);
    tmpIfTest = tmpChainElementCall;
  } else {
  }
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = NaN.x;
let b = undefined;
const c = a == null;
if (c) {

}
else {
  const d = a.x( a );
  b = d;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    a ** 0;
    a = NaN.x;
    let e = undefined;
    const f = a == null;
    if (f) {

    }
    else {
      const g = a.x( a );
      e = g;
    }
    if (e) {

    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- regular property of a primitive;
