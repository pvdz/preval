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

## Pre Normal

`````js filename=intro
let a = 1,
  b = 2,
  c = 3,
  d = 4;
tmpSwitchBreak: {
  let a$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    a$1 = b = $(c).y = $(d);
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedRhs = $(d);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    b = tmpNestedComplexRhs;
    a$1 = tmpNestedComplexRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(3);
  const varInitAssignLhsComputedRhs = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
  $(1, varInitAssignLhsComputedRhs, 3);
} else {
  $(1, 2, 3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
if (c) {
  const d = $( 3 );
  const e = $( 4 );
  d.y = e;
  $( 1, e, 3 );
}
else {
  $( 1, 2, 3 );
}
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
