# Preval test case

# ident_computed_member_complex_assign.md

> Normalize > Binding > Case-block > Ident computed member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let obj = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = $(obj)[$('x')] = $(obj)[$('y')] = $(d); break; }
$(a, b, c, d, obj);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const obj /*:object*/ /*truthy*/ = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    debugger;
    $(`set`);
    return undefined;
  },
};
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(obj);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(obj);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(4);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
} else {
}
const b /*:object*/ /*truthy*/ = { x: 2 };
$(1, b, 3, 4, obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const obj = {
  get c() {
    $(`get`);
  },
  set c($$0) {
    $(`set`);
  },
};
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj = $(obj);
  const tmpNestedAssignComMemberProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(obj);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = $(4);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
}
$(1, { x: 2 }, 3, 4, obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = {
  get c() {
    debugger;
    $( "get" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
    $( "set" );
    return undefined;
  },
};
if (c) {
  const e = $( d );
  const f = $( "x" );
  const g = $( d );
  const h = $( "y" );
  const i = $( 4 );
  g[h] = i;
  e[f] = i;
}
const j = { x: 2 };
$( 1, j, 3, 4, d );
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
    const tmpNestedAssignComMemberObj = $(obj);
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpInitAssignLhsComputedObj = $(obj);
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
$(a, b, c, d, obj);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { c: '<get/set>' }
 - 4: 'x'
 - 5: { c: '<get/set>' }
 - 6: 'y'
 - 7: 4
 - 8: 1, { x: '2' }, 3, 4, { c: '<get/set>', y: '4', x: '4' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
