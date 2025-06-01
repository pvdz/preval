# Preval test case

# ai_rule310_cond_assign_opaque_branch.md

> Ai > Ai4 > Ai rule310 cond assign opaque branch
>
> Test: Conditional assignment, one branch opaque, variable used.

## Input

`````js filename=intro
// Expected: if ($('cond')) { $('A', 'val'); } else { $('A', 10); }
let x;
if ($('cond')) {
  x = $('val');
} else {
  x = 10;
}
$('A', x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`val`);
  $(`A`, tmpClusterSSA_x);
} else {
  $(`A`, 10);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`A`, $(`val`));
} else {
  $(`A`, 10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  const b = $( "val" );
  $( "A", b );
}
else {
  $( "A", 10 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  x = $(`val`);
  $(`A`, x);
} else {
  x = 10;
  $(`A`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'val'
 - 3: 'A', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
