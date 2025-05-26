# Preval test case

# if_fold_ternary_const_edge_47.md

> If test merging > If fold ternary const edge 47
>
> Edge Case 47: Scenario C - Multiple controlIf candidates, picks correct one

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x) { // Potential controlIf 1 (further away)
  y = $(false); // This would make y false if x=T
}

// Some other code
let unrelated = 1;

if (x) { // Potential controlIf 2 (closer, should be chosen)
  // x is true, y was false.
  y = "Truthy!"; // y made truthy.
} else {
  // x is false, y was true. Not reassigned.
}

// y becomes "Truthy!" or stays true. So always truthy.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x) {
  y = $(false);
}
let unrelated = 1;
if (x) {
  y = "Truthy!";
} else {}
{ // Simplified from if(y)
  $('THEN');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(false);
  $(`THEN`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
  $(`THEN`);
} else {
  $(`THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
  $( "THEN" );
}
else {
  $( "THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = $(false);
} else {
}
let unrelated = 1;
if (x) {
  y = `Truthy!`;
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
 - 2: false
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
