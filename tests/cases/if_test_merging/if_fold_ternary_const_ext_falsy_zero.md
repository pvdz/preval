# Preval test case

# if_fold_ternary_const_ext_falsy_zero.md

> If test merging > If fold ternary const ext falsy zero
>
> Test Scenario D: y becomes consistently FALSY (assigned 0)

## Input

`````js filename=intro
let x = $(false); // Unknown to Preval
let y = !x;

if (x) {
  // x is true, y was false
  // y is not reassigned (remains false/falsy)
} else {
  // x is false, y was true
  y = 0; // y becomes falsy
}

// y should be consistently falsy here.
if (y) {
  $('BRANCH_THEN');
} else {
  $('BRANCH_ELSE');
}

/* Expected output:
let x = $(false);
let y = !x;

if (x) {
  // y is not reassigned
} else {
  y = 0;
}

{ // Simplified from if(y) as y is always falsy
  $('BRANCH_ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(false);
$(`BRANCH_ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
$(`BRANCH_ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
$( "BRANCH_ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(false);
let y = !x;
if (x) {
} else {
  y = 0;
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
 - 1: false
 - 2: 'BRANCH_ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
