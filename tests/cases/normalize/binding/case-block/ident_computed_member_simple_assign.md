# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > case-block > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b[$('x')] = $(c)[$('y')] = $(d); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
let varInitAssignLhsComputedObj;
let varInitAssignLhsComputedProp;
let varInitAssignLhsComputedObj$1;
let varInitAssignLhsComputedProp$1;
let varInitAssignLhsComputedRhs$1;
let varInitAssignLhsComputedRhs;
let a_1;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    varInitAssignLhsComputedObj = b;
    varInitAssignLhsComputedProp = $('x');
    varInitAssignLhsComputedObj$1 = $(c);
    varInitAssignLhsComputedProp$1 = $('y');
    varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    a_1 = varInitAssignLhsComputedRhs;
    break tmpSwitchBreak;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
const tmpSwitchTest = $('a');
let a_1;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const varInitAssignLhsComputedProp = $('x');
    const varInitAssignLhsComputedObj$1 = $(3);
    const varInitAssignLhsComputedProp$1 = $('y');
    const varInitAssignLhsComputedRhs$1 = $(4);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
    a_1 = varInitAssignLhsComputedRhs$1;
    break tmpSwitchBreak;
  }
}
$(1, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'x'
 - 4: 3
 - 5: 'y'
 - 6: 4
 - 7: 1, { x: '4' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
