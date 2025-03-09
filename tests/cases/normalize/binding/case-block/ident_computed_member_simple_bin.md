# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Case-block > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b[$('x')] = c + d; break; }
$(a, b, c);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const b /*:object*/ = { x: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  b[tmpNestedAssignComMemberProp] = 7;
  $(1, b, 3);
} else {
  $(1, b, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const b = { x: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberProp = $(`x`);
  b[tmpNestedAssignComMemberProp] = 7;
  $(1, b, 3);
} else {
  $(1, b, 3);
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
    a$1 = b[$(`x`)] = c + d;
    break tmpSwitchBreak;
  } else {
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
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = b;
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpNestedAssignPropRhs = c + d;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a$1 = tmpNestedPropAssignRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = { x: 2 };
if (c) {
  const e = $( "x" );
  d[e] = 7;
  $( 1, d, 3 );
}
else {
  $( 1, d, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'x'
 - 4: 1, { x: '7' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
