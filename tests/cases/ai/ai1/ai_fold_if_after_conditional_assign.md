# Preval test case

# ai_fold_if_after_conditional_assign.md

> Ai > Ai1 > Ai fold if after conditional assign
>
> Test: Folding an if statement whose test is an identifier from a conditional assignment (normalized ternary).

## Input

`````js filename=intro
// Expected: let c = $("cond"); if (c) { $("TRUE"); } else { $("FALSE"); }
let c = $("cond");
let t; // Normalized from: let t = c ? true : false;
if (c) {
  t = true;
} else {
  t = false;
}

if (t) { // This if should be folded with the logic determining t
  $("TRUE");
} else {
  $("FALSE");
}
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(`cond`);
if (c) {
  $(`TRUE`);
} else {
  $(`FALSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`TRUE`);
} else {
  $(`FALSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  $( "TRUE" );
}
else {
  $( "FALSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(`cond`);
let t = undefined;
if (c) {
  t = true;
} else {
  t = false;
}
if (t) {
  $(`TRUE`);
} else {
  $(`FALSE`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'TRUE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
