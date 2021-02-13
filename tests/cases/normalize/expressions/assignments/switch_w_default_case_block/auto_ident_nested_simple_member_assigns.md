# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > switch_w_default_case_block > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = b.x = b.x = b.x = b.x = b.x = b.x = c;
  }
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
{
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    {
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
      const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
      b.x = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
    }
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
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
{
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    {
      b.x = 3;
      b.x = 3;
      b.x = 3;
      b.x = 3;
      b.x = 3;
      b.x = 3;
      a = 3;
    }
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
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
