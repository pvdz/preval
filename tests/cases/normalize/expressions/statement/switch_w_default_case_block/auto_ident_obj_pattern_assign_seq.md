# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Switch w default case block > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
    }
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      {
        ({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }));
      }
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $(x);
    $(y);
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpAssignObjPatternRhs.x;
    y = tmpAssignObjPatternRhs.y;
    break tmpSwitchBreak;
  } else {
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $('fail1');
  } else {
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$7) {
    $('fail2');
  } else {
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $(1);
    $(2);
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpAssignObjPatternRhs.x;
    y = tmpAssignObjPatternRhs.y;
    break tmpSwitchBreak;
  } else {
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $('fail1');
  } else {
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$7) {
    $('fail2');
  } else {
  }
}
$(a, x, y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
