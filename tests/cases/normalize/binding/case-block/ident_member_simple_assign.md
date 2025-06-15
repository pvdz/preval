# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Case-block > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b.x = $(c).y = $(d); break; }
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const b /*:object*/ /*truthy*/ = { x: 2 };
if (tmpIfTest) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(4);
  tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs;
  b.x = tmpInitAssignLhsComputedRhs;
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
  const tmpInitAssignLhsComputedObj = $(3);
  const tmpInitAssignLhsComputedRhs = $(4);
  tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs;
  b.x = tmpInitAssignLhsComputedRhs;
  $(1, b, 3);
} else {
  $(1, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = { x: 2 };
if (c) {
  const e = $( 3 );
  const f = $( 4 );
  e.y = f;
  d.x = f;
  $( 1, d, 3 );
}
else {
  $( 1, d, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

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
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedRhs = $(d);
    tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs;
    a$1 = tmpNestedPropAssignRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 3
 - 4: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
