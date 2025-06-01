# Preval test case

# ai_rule316_chain_assign_opaque_cond_use.md

> Ai > Ai4 > Ai rule316 chain assign opaque cond use
>
> Test: Chained assignment with opaque RHS, intermediate var used in opaque condition.

## Input

`````js filename=intro
// Expected: let a,b; a = b = $('val'); if ($('cond', b)) { $('path_A'); } else { $('path_B'); }
let a, b;
a = b = $('val');
if ($('cond', b)) {
  $('path_A');
} else {
  $('path_B');
}
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(`val`);
const tmpIfTest /*:unknown*/ = $(`cond`, tmpNestedComplexRhs);
if (tmpIfTest) {
  $(`path_A`);
} else {
  $(`path_B`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`, $(`val`))) {
  $(`path_A`);
} else {
  $(`path_B`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = $( "cond", a );
if (b) {
  $( "path_A" );
}
else {
  $( "path_B" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
const tmpNestedComplexRhs = $(`val`);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
const tmpIfTest = $(`cond`, b);
if (tmpIfTest) {
  $(`path_A`);
} else {
  $(`path_B`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'cond', 'val'
 - 3: 'path_A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
