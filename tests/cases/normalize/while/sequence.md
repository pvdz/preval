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

## Output


`````js filename=intro
let tmpClusterSSA_x = NaN.x;
let tmpIfTest = false;
const tmpChainRootProp = tmpClusterSSA_x;
const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_x == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = tmpChainRootProp.x(tmpClusterSSA_x);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x ** 0;
    tmpClusterSSA_x = NaN.x;
    let tmpIfTest$2 = false;
    const tmpChainRootProp$1 = tmpClusterSSA_x;
    const tmpIfTest$4 /*:boolean*/ = tmpClusterSSA_x == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementCall$1 = tmpChainRootProp$1.x(tmpClusterSSA_x);
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

## PST Output

With rename=true

`````js filename=intro
let a = NaN.x;
let b = false;
const c = a;
const d = a == null;
if (d) {

}
else {
  const e = c.x( a );
  b = e;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    a ** 0;
    a = NaN.x;
    let f = false;
    const g = a;
    const h = a == null;
    if (h) {

    }
    else {
      const i = g.x( a );
      f = i;
    }
    if (f) {

    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
