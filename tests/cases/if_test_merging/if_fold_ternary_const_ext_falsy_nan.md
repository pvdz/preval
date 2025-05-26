# Preval test case

# if_fold_ternary_const_ext_falsy_nan.md

> If test merging > If fold ternary const ext falsy nan
>
> Test Scenario D: y becomes consistently FALSY (assigned global NaN)

## Input

`````js filename=intro
let x = $(true);
let y = !x;

if (x) {
  // x is true, y was false.
  // y not made truthy (e.g. y = "" or y = 0 or no change).
  // For this test, let y remain false implicitly.
} else {
  // x is false, y was true.
  y = NaN; // y becomes falsy (global NaN)
}

// y should be consistently falsy here.
if (y) {
  $('BRANCH_THEN');
} else {
  $('BRANCH_ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;

if (x) {
  // y not made truthy
} else {
  y = NaN;
}

{ // Simplified from if(y) as y is always falsy
  $('BRANCH_ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(`BRANCH_ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`BRANCH_ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "BRANCH_ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
} else {
  y = $Number_NaN;
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
 - 2: 'BRANCH_ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
