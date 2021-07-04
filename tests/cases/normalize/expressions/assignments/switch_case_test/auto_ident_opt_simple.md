# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.x):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ((a = b?.x) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
$(1);
const b = { x: 1 };
const tmpIfTest$1 = b == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject = b.x;
  $(tmpChainElementObject);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
