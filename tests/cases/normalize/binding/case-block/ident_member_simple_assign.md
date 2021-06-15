# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Case-block > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b.x = $(c).y = $(d); break; }
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3,
  d = 4;
{
  let a$1;
  const tmpSwitchValue = $(`a`);
  let tmpSwitchCaseToStart = 1;
  if ($(`a`) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a$1 = b.x = $(c).y = $(d);
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
let a$1 = undefined;
const tmpSwitchValue = $(`a`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedRhs = $(d);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs;
    a$1 = tmpNestedPropAssignRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const tmpSwitchValue = $(`a`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const varInitAssignLhsComputedObj = $(3);
    const varInitAssignLhsComputedRhs = $(4);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
    b.x = varInitAssignLhsComputedRhs;
    break tmpSwitchBreak;
  } else {
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
