# Preval test case

# auto_ident_nested_member_complex_simple.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_nested_member_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      $(b)[$("x")] = $(c)[$("y")] = d;
    }
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
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
      const tmpAssignComMemLhsObj = $(b);
      const tmpAssignComMemLhsProp = $('x');
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      const varInitAssignLhsComputedObj = $(c);
      const varInitAssignLhsComputedProp = $('y');
      const varInitAssignLhsComputedRhs = d;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
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
      const tmpAssignComMemLhsObj = $(b);
      const tmpAssignComMemLhsProp = $('x');
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      const varInitAssignLhsComputedObj = $(c);
      const varInitAssignLhsComputedProp = $('y');
      const varInitAssignLhsComputedRhs = d;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
$(a, b, c, d);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same