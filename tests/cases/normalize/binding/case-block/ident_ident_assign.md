# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Case-block > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b = $(c).y = $(d); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let a$1;
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
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedRhs = $(d);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    b = tmpNestedComplexRhs;
    a$1 = tmpNestedComplexRhs;
    break tmpSwitchBreak;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 2;
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
    const varInitAssignLhsComputedObj = $(3);
    const varInitAssignLhsComputedRhs = $(4);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
    b = varInitAssignLhsComputedRhs;
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
 - 3: 3
 - 4: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Normalized calls: Same

Final output calls: Same
