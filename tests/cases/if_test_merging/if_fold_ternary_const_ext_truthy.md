# Preval test case

# if_fold_ternary_const_ext_truthy.md

> If test merging > If fold ternary const ext truthy
>
> Test Scenario C: y becomes consistently TRUTHY (assigned a truthy string)

## Input

`````js filename=intro
let x = $(true); // Unknown to Preval, just a tracked var
let y = !x;

if (x) {
  // x is true, y was false
  y = "hello"; // y becomes truthy
} else {
  // x is false, y was true (truthy)
  // y is not reassigned, so remains truthy
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
  y = "hello";
} else {
  // y is not reassigned
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
  y = `hello`;
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
