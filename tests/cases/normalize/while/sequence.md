# Preval test case

# sequence.md

> Normalize > While > Sequence
>
> Test should be normalized

#TODO

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
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, x);
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
let $tmpLoopUnrollCheck = true;
let x = NaN.x;
let tmpIfTest = false;
const tmpChainRootProp = x;
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, x);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    x ** 0;
    x = NaN;
    x = NaN.x;
    let tmpIfTest$2 = false;
    const tmpChainRootProp$1 = x;
    const tmpIfTest$4 = tmpChainRootProp$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, x);
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
let a = true;
let b = NaN.x;
let c = false;
const d = b;
const e = d == null;
if (e) {

}
else {
  const f = d.x;
  const g = $dotCall( f, d, b );
  c = g;
}
if (c) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    b ** 0;
    b = NaN;
    b = NaN.x;
    let h = false;
    const i = b;
    const j = i == null;
    if (j) {

    }
    else {
      const k = i.x;
      const l = $dotCall( k, i, b );
      h = l;
    }
    if (h) {

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
