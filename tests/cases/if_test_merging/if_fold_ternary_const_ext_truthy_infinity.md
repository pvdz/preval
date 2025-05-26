# Preval test case

# if_fold_ternary_const_ext_truthy_infinity.md

> If test merging > If fold ternary const ext truthy infinity
>
> Test Scenario C: y becomes consistently TRUTHY (assigned global Infinity)

## Input

`````js filename=intro
let x = $(true);
let y = !x;

if (x) {
  // x is true, y was false.
  y = Infinity; // y becomes truthy (global Infinity)
} else {
  // x is false, y was true.
  // y not made falsy (e.g. y remains true, or y = {} etc).
  // For this test, let y remain true implicitly.
}

// y should be consistently truthy here.
if (y) {
  $('BRANCH_THEN');
} else {
  $('BRANCH_ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;

if (x) {
  y = Infinity;
} else {
  // y not made falsy
}

{ // Simplified from if(y) as y is always truthy
  $('BRANCH_THEN');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(`BRANCH_THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`BRANCH_THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "BRANCH_THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = $Number_POSITIVE_INFINITY;
} else {
}
if (y) {
  $(`BRANCH_THEN`);
} else {
  $(`BRANCH_ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'BRANCH_THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
