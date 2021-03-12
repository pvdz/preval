# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Switch case test > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case { x: $(1), y: 2, z: $(3) }:
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ({ x: $(1), y: 2, z: $(3) } === tmpSwitchValue) tmpSwitchCaseToStart = 0;
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
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
const tmpBinLhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const tmpBinLhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
