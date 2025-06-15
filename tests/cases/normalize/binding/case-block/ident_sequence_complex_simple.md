# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > Case-block > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = ($(b), $(c)).x = c; break; }
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(2);
  const tmpNestedAssignObj /*:unknown*/ = $(3);
  tmpNestedAssignObj.x = 3;
  $(1, 2, 3);
} else {
  $(1, 2, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`a`) === $(`a`)) {
  $(2);
  const tmpNestedAssignObj = $(3);
  tmpNestedAssignObj.x = 3;
  $(1, 2, 3);
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
  $( 2 );
  const d = $( 3 );
  d.x = 3;
  $( 1, 2, 3 );
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
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(b);
    const tmpNestedAssignObj = $(c);
    const tmpNestedPropAssignRhs = c;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
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
 - 3: 2
 - 4: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
