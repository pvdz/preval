# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > case-block > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = $(b).x = $(c).y = $(d); break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
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
      a_1 = undefined;
      const tmpNestedAssignObj = $(b);
      let tmpNestedAssignPropRhs;
      const tmpNestedAssignObj$1 = $(c);
      const tmpNestedAssignPropRhs$1 = $(d);
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
      tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
      tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
      a_1 = tmpNestedPropAssignRhs$1;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
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
      a_1 = undefined;
      const tmpNestedAssignObj = $(b);
      let tmpNestedAssignPropRhs;
      const tmpNestedAssignObj$1 = $(c);
      const tmpNestedAssignPropRhs$1 = $(d);
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
      tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
      tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
      a_1 = tmpNestedPropAssignRhs$1;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c, d);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { x: '2' }
 - 4: 3
 - 5: 4
 - 6: 1, { x: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
