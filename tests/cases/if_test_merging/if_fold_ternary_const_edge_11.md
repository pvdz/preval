# Preval test case

# if_fold_ternary_const_edge_11.md

> If test merging > If fold ternary const edge 11
>
> Edge Case 11: Scenario A - y becomes truthy (array) in then, falsy (undefined) in else

## Input

`````js filename=intro
let x = $(true);
let y = !x; // if x=T, y=F; if x=F, y=T

if (x) {
  // x is true, y was false
  y = []; // y becomes truthy
} else {
  // x is false, y was true
  y = undefined; // y becomes falsy
}

// y is equivalent to x
if (y) {
  $('THEN_Y');
} else {
  $('ELSE_Y');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x) {
  y = [];
} else {
  y = undefined;
}
if (x) { // Transformed from if(y)
  $('THEN_Y');
} else {
  $('ELSE_Y');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`THEN_Y`);
} else {
  $(`ELSE_Y`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`THEN_Y`);
} else {
  $(`ELSE_Y`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "THEN_Y" );
}
else {
  $( "ELSE_Y" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = [];
} else {
  y = undefined;
}
if (y) {
  $(`THEN_Y`);
} else {
  $(`ELSE_Y`);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'THEN_Y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
