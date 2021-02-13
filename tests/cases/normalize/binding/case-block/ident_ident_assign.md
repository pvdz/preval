# Preval test case

# ident_ident_assign.md

> normalize > assignment > case-block > ident_ident_assign
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
const tmpSwitchTest = $('a');
{
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
      const tmpNestedAssignObj = $(c);
      const tmpNestedAssignPropRhs = $(d);
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
      tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
      b = tmpNestedPropAssignRhs;
      a_1 = b;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
{
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
      const tmpNestedAssignObj = $(c);
      const tmpNestedAssignPropRhs = $(d);
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
      tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
      b = tmpNestedPropAssignRhs;
      a_1 = b;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 3
 - 4: 4
 - 5: 1, 4, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same