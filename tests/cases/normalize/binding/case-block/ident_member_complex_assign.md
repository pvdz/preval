# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Case-block > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = $(b).x = $(c).y = $(d); break; }
$(a, b, c, d);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const b /*:object*/ = { x: 2 };
if (tmpIfTest) {
  const tmpNestedAssignObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
  const varInitAssignLhsComputedRhs /*:unknown*/ = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
  tmpNestedAssignObj.x = varInitAssignLhsComputedRhs;
  $(1, b, 3, 4);
} else {
  $(1, b, 3, 4);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const b = { x: 2 };
if (tmpIfTest) {
  const tmpNestedAssignObj = $(b);
  const varInitAssignLhsComputedObj = $(3);
  const varInitAssignLhsComputedRhs = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs;
  tmpNestedAssignObj.x = varInitAssignLhsComputedRhs;
  $(1, b, 3, 4);
} else {
  $(1, b, 3, 4);
}
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

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = { x: 2 };
if (c) {
  const e = $( d );
  const f = $( 3 );
  const g = $( 4 );
  f.y = g;
  e.x = g;
  $( 1, d, 3, 4 );
}
else {
  $( 1, d, 3, 4 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { x: '2' }
 - 4: 3
 - 5: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
