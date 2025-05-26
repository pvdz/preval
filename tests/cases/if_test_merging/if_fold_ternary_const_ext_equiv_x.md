# Preval test case

# if_fold_ternary_const_ext_equiv_x.md

> If test merging > If fold ternary const ext equiv x
>
> Test Scenario A: y becomes equivalent to x

## Input

`````js filename=intro
let x = $(true);
let y = !x;

if (x) {
  // x is true, y was false.
  y = "truthy"; // y becomes truthy
} else {
  // x is false, y was true.
  y = 0;      // y becomes falsy
}

// y should now be equivalent to x in truthiness.
// if(y) should become if(x).
if (y) {
  $('BRANCH_THEN_Y');
} else {
  $('BRANCH_ELSE_Y');
}

/* Expected output:
let x = $(true);
let y = !x;

if (x) {
  y = "truthy";
} else {
  y = 0;
}

// Transformed from if(y)
if (x) {
  $('BRANCH_THEN_Y');
} else {
  $('BRANCH_ELSE_Y');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`BRANCH_THEN_Y`);
} else {
  $(`BRANCH_ELSE_Y`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`BRANCH_THEN_Y`);
} else {
  $(`BRANCH_ELSE_Y`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "BRANCH_THEN_Y" );
}
else {
  $( "BRANCH_ELSE_Y" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = `truthy`;
} else {
  y = 0;
}
if (y) {
  $(`BRANCH_THEN_Y`);
} else {
  $(`BRANCH_ELSE_Y`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'BRANCH_THEN_Y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
