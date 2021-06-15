# Preval test case

# ident_computed_member_complex_simple.md

> Normalize > Binding > Case-block > Ident computed member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { case $('a'): let a = $(b)[$('x')] = c; break; }
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3;
{
  let a$1;
  const tmpSwitchValue = $(`a`);
  let tmpSwitchCaseToStart = 1;
  if ($(`a`) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a$1 = $(b)[$(`x`)] = c;
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
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpNestedPropAssignRhs = c;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
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
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
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
 - 3: { x: '2' }
 - 4: 'x'
 - 5: 1, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
