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
let tmpClusterSSA_x = NaN.x;
let tmpIfTest = false;
const tmpChainRootProp = tmpClusterSSA_x;
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, tmpClusterSSA_x);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x ** 0;
    tmpClusterSSA_x = NaN.x;
    let tmpIfTest$2 = false;
    const tmpChainRootProp$1 = tmpClusterSSA_x;
    const tmpIfTest$4 = tmpChainRootProp$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, tmpClusterSSA_x);
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
