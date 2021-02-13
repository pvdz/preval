# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > case-block > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b[$('x')] = c + d; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
{
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
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
      varInitAssignLhsComputedRhs = c + d;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a_1 = varInitAssignLhsComputedRhs;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
{
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
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
      varInitAssignLhsComputedRhs = c + d;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a_1 = varInitAssignLhsComputedRhs;
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
 - 3: 'x'
 - 4: 1, { x: '7' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same