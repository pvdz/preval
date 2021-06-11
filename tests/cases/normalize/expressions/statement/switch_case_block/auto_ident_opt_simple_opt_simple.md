# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Statement > Switch case block > Auto ident opt simple opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    b?.x?.y;
  }
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      {
        b?.x?.y;
      }
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpChainRootProp = b;
  const tmpIfTest$3 = tmpChainRootProp != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpIfTest$5 = tmpChainElementObject != null;
    if (tmpIfTest$5) {
      const tmpChainElementObject$1 = tmpChainElementObject.y;
    } else {
    }
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const b = { x: tmpObjLitVal };
  const tmpIfTest$3 = b == null;
  if (tmpIfTest$3) {
  } else {
    const tmpChainElementObject = b.x;
    const tmpIfTest$5 = tmpChainElementObject == null;
    if (tmpIfTest$5) {
    } else {
      tmpChainElementObject.y;
    }
  }
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
