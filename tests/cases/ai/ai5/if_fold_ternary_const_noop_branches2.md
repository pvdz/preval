# Preval test case

# if_fold_ternary_const_noop_branches2.md

> Ai > Ai5 > If fold ternary const noop branches2
>
> y remains as initialized, no branch reassigns

## Input

`````js filename=intro
      const x /*:unknown*/ = $(true);
let y /*:boolean*/ = false;
const tmpBool /*:boolean*/ /*banged*/ = !x;
y = tmpBool;
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE" );
}
else {
  $( "THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let y = false;
const tmpBool = !x;
y = tmpBool;
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
