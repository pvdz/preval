# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      b.x = b.x = b.x = b.x = b.x = b.x = c;
    }
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    {
      const tmpAssignMemLhsObj = b;
      const varInitAssignLhsComputedRhs$4 = c;
      b.x = varInitAssignLhsComputedRhs$4;
      const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
      b.x = varInitAssignLhsComputedRhs$3;
      const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
      b.x = varInitAssignLhsComputedRhs$2;
      const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
      b.x = varInitAssignLhsComputedRhs$1;
      const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      b.x = varInitAssignLhsComputedRhs;
      const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    $('fail1');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$4) {
    $('fail2');
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    {
      const tmpAssignMemLhsObj = b;
      const varInitAssignLhsComputedRhs$4 = c;
      b.x = varInitAssignLhsComputedRhs$4;
      const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
      b.x = varInitAssignLhsComputedRhs$3;
      const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
      b.x = varInitAssignLhsComputedRhs$2;
      const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
      b.x = varInitAssignLhsComputedRhs$1;
      const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      b.x = varInitAssignLhsComputedRhs;
      const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
    break tmpSwitchBreak;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    $('fail1');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$4) {
    $('fail2');
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same