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
      let tmpNestedAssignPropRhs;
      let tmpNestedAssignPropRhs$1;
      let tmpNestedAssignPropRhs$2;
      let tmpNestedAssignPropRhs$3;
      let tmpNestedAssignPropRhs$4;
      const tmpNestedPropAssignRhs = c;
      b.x = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
      b.x = tmpNestedPropAssignRhs$1;
      tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
      const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
      b.x = tmpNestedPropAssignRhs$2;
      tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
      const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
      b.x = tmpNestedPropAssignRhs$3;
      tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
      const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
      b.x = tmpNestedPropAssignRhs$4;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
      const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
      b.x = tmpNestedPropAssignRhs$5;
      a = tmpNestedPropAssignRhs$5;
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
      let tmpNestedAssignPropRhs;
      let tmpNestedAssignPropRhs$1;
      let tmpNestedAssignPropRhs$2;
      let tmpNestedAssignPropRhs$3;
      let tmpNestedAssignPropRhs$4;
      const tmpNestedPropAssignRhs = c;
      b.x = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
      b.x = tmpNestedPropAssignRhs$1;
      tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
      const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
      b.x = tmpNestedPropAssignRhs$2;
      tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
      const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
      b.x = tmpNestedPropAssignRhs$3;
      tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
      const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
      b.x = tmpNestedPropAssignRhs$4;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
      const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
      b.x = tmpNestedPropAssignRhs$5;
      a = tmpNestedPropAssignRhs$5;
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
