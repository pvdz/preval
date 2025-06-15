# Preval test case

# ident_computed_member_simple_assign.md

> Normalize > Binding > Case-block > Ident computed member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let obj = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b[$('x')] = $(c)[$('y')] = $(d); break; }
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const b /*:object*/ /*truthy*/ = { x: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(4);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  b[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
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
  const tmpInitAssignLhsComputedObj = $(3);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = $(4);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  b[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
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
  const e = $( "x" );
  const f = $( 3 );
  const g = $( "y" );
  const h = $( 4 );
  f[g] = h;
  d[e] = h;
  $( 1, d, 3 );
}
else {
  $( 1, d, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`set`);
    return undefined;
  },
};
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
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedProp = $(`y`);
    const tmpInitAssignLhsComputedRhs = $(d);
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
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
 - 3: 'x'
 - 4: 3
 - 5: 'y'
 - 6: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
