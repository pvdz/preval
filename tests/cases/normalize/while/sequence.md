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
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x?.x(x))) {}
`````

## Normalized

`````js filename=intro
let x = 1;
while (true) {
  x = x * 'str';
  x = x * 8;
  x = x * x;
  x = x.x;
  let tmpIfTest = undefined;
  const tmpChainRootProp = x;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, x);
    tmpIfTest = tmpChainElementCall;
  }
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let x = 1;
while (true) {
  x = x * 'str';
  x = x * 8;
  x = x * x;
  x = x.x;
  let tmpIfTest = undefined;
  const tmpChainRootProp = x;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, x);
    tmpIfTest = tmpChainElementCall;
  }
  if (tmpIfTest) {
  } else {
    break;
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
