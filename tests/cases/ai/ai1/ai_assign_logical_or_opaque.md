# Preval test case

# ai_assign_logical_or_opaque.md

> Ai > Ai1 > Ai assign logical or opaque
>
> Test: Assignment from logical OR with opaque operands.

## Input

`````js filename=intro
// Expected: let x; const $$a = $('A'); if ($$a) { x = $$a; } else { x = $('B'); } $('use', x);
let x;
x = $('A') || $('B');
$('use', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`A`);
if (x) {
  $(`use`, x);
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(`B`);
  $(`use`, tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`A`);
if (x) {
  $(`use`, x);
} else {
  $(`use`, $(`B`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "A" );
if (a) {
  $( "use", a );
}
else {
  const b = $( "B" );
  $( "use", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(`A`);
if (x) {
  $(`use`, x);
} else {
  x = $(`B`);
  $(`use`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'use', 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
