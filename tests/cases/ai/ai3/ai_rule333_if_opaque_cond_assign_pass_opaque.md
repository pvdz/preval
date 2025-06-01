# Preval test case

# ai_rule333_if_opaque_cond_assign_pass_opaque.md

> Ai > Ai3 > Ai rule333 if opaque cond assign pass opaque
>
> Test: Variable assigned different opaque values in if/else, then passed to opaque function.

## Input

`````js filename=intro
// Expected: let x; if ($('cond')) { x = $('valA'); } else { x = $('valB'); } $('use', x);
let x;
if ($('cond')) {
  x = $('valA');
} else {
  x = $('valB');
}
$('use', x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`valA`);
  $(`use`, tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`valB`);
  $(`use`, tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`use`, $(`valA`));
} else {
  $(`use`, $(`valB`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  const b = $( "valA" );
  $( "use", b );
}
else {
  const c = $( "valB" );
  $( "use", c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  x = $(`valA`);
  $(`use`, x);
} else {
  x = $(`valB`);
  $(`use`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'valA'
 - 3: 'use', 'valA'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
