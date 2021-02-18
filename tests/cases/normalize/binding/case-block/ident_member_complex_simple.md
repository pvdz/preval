# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > case-block > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { case $('a'): let a = $(b).x = c; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
const tmpSwitchTest = $('a');
let varInitAssignLhsComputedObj;
let varInitAssignLhsComputedRhs;
let a$1;
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
    varInitAssignLhsComputedObj = $(b);
    varInitAssignLhsComputedRhs = c;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    a$1 = varInitAssignLhsComputedRhs;
    break tmpSwitchBreak;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const tmpSwitchTest = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const varInitAssignLhsComputedObj = $(b);
    varInitAssignLhsComputedObj.x = 3;
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
 - 3: { x: '2' }
 - 4: 1, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
