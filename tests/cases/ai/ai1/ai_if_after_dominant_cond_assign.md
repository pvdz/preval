# Preval test case

# ai_if_after_dominant_cond_assign.md

> Ai > Ai1 > Ai if after dominant cond assign
>
> Test: Redundant if based on var from dominant conditional assignment.

## Input

`````js filename=intro
// Expected: let cond = $('C'); if (cond) { $('A'); } else { $('B'); }
let cond = $('C');
let x;
if (cond) {
  x = true;
} else {
  x = false;
}
// Can Preval see that x is directly determined by cond?
if (x) { 
  $('A');
} else {
  $('B');
}
`````


## Settled


`````js filename=intro
const cond /*:unknown*/ = $(`C`);
if (cond) {
  $(`A`);
} else {
  $(`B`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`C`)) {
  $(`A`);
} else {
  $(`B`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "C" );
if (a) {
  $( "A" );
}
else {
  $( "B" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let cond = $(`C`);
let x = undefined;
if (cond) {
  x = true;
} else {
  x = false;
}
if (x) {
  $(`A`);
} else {
  $(`B`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C'
 - 2: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
