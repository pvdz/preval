# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = ($(b), $(c)).x = $(c); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
const tmpSwitchTest = $('a');
{
  let varInitAssignLhsComputedObj;
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
      $(b);
      varInitAssignLhsComputedObj = $(c);
      varInitAssignLhsComputedRhs = $(c);
      varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
      a_1 = varInitAssignLhsComputedRhs;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpSwitchTest = $('a');
{
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedRhs;
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
      $(2);
      varInitAssignLhsComputedObj = $(3);
      varInitAssignLhsComputedRhs = $(3);
      varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
      a_1 = varInitAssignLhsComputedRhs;
      break tmpSwitchBreak;
    }
  }
}
$(1, 2, 3);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 2
 - 4: 3
 - 5: 3
 - 6: 1, 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
