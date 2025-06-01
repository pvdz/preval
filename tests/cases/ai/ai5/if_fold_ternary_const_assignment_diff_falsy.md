# Preval test case

# if_fold_ternary_const_assignment_diff_falsy.md

> Ai > Ai5 > If fold ternary const assignment diff falsy
>
> Both branches assign different falsy values

## Input

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = 0;
} else {
  y = null;
}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
// Expect: always ELSE
`````


## Settled


`````js filename=intro
$(true);
$(`ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = 0;
} else {
  y = null;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
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
