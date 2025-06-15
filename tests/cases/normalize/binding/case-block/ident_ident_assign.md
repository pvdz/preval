# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Case-block > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b = $(c).y = $(d); break; }
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(4);
  tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs;
  $(1, tmpInitAssignLhsComputedRhs, 3);
} else {
  $(1, 2, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`a`) === $(`a`)) {
  const tmpInitAssignLhsComputedObj = $(3);
  const tmpInitAssignLhsComputedRhs = $(4);
  tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs;
  $(1, tmpInitAssignLhsComputedRhs, 3);
} else {
  $(1, 2, 3);
}
`````


## PST Settled
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


## Normalized
(This is what phase1 received the first time)

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
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedRhs = $(d);
    tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs;
    b = tmpNestedComplexRhs;
    a$1 = tmpNestedComplexRhs;
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
