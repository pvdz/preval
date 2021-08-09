# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Case-block > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = $(b).x = $(c).y = $(d); break; }
$(a, b, c, d);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3,
  d = 4;
tmpSwitchBreak: {
  let a$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    a$1 = $(b).x = $(c).y = $(d);
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpNestedAssignObj = $(b);
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedRhs = $(d);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    a$1 = tmpNestedPropAssignRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpNestedAssignObj = $(b);
  const varInitAssignLhsComputedObj = $(3);
  const varInitAssignLhsComputedRhs = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
  tmpNestedAssignObj.x = varInitAssignLhsComputedRhs;
} else {
}
$(1, b, 3, 4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { x: '2' }
 - 4: 3
 - 5: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
