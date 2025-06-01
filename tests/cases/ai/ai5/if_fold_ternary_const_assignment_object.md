# Preval test case

# if_fold_ternary_const_assignment_object.md

> Ai > Ai5 > If fold ternary const assignment object
>
> One branch assigns an object

## Input

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = {};
} else {
  // no assignment
}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
// Expect: always THEN
`````


## Settled


`````js filename=intro
$(true);
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = {};
} else {
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
 - 2: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
