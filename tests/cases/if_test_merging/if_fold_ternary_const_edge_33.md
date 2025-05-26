# Preval test case

# if_fold_ternary_const_edge_33.md

> If test merging > If fold ternary const edge 33
>
> Edge Case 33: Scenario D - x starts false, y made falsy in controlIf.else

## Input

`````js filename=intro
let x = $(false);
let y = !x; // x=F,y=T

if (x) {
  // x is false, this branch not taken. y (was F) would be T.
  y = true; // yMadeTruthyInThen = true, yReassignedInThen = true
} else {
  // x is false, this branch IS taken. y (was T) made 0.
  y = 0;    // yMadeFalsyInElse = true, yReassignedInElse = true
}

// If x is false: y starts T, becomes 0 (F).
// If x is true (hypothetically for analysis): y starts F, becomes T.
// Analysis: yMadeTruthyInThen=true. yMadeFalsyInElse=true.
// Scenario D: (!yReassignedInThen || (yReassignedInThen && !yMadeTruthyInThen)) && yMadeFalsyInElse
// => (!true || (true && !true)) && true => (false || false) && true => false. This means NOT SCENARIO D.
// Scenario C: yMadeTruthyInThen && (!yReassignedInElse || (yReassignedInElse && !yMadeFalsyInElse))
// => true && (!true || (true && !true)) => true && (false || false) => false. This means NOT SCENARIO C.
// Scenario A: yMadeTruthyInThen && yMadeFalsyInElse => true && true => TRUE.
// So this should be Scenario A: if(y) -> if(x).

// Let me re-evaluate my own logic for the description.
// If x is true: y is init false. In controlIF.then, y becomes true.
// If x is false: y is init true. In controlIF.else, y becomes 0 (false).
// This is exactly Scenario A: y ends up tracking x.
if (y) {
  $('THEN_Y');
} else {
  $('ELSE_Y');
}

/* Expected output (Scenario A -> if(x) ):
let x = $(false);
let y = !x;
if (x) {
  y = true;
} else {
  y = 0;
}
if (x) {
  $('THEN_Y');
} else {
  $('ELSE_Y');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(false);
if (x) {
  $(`THEN_Y`);
} else {
  $(`ELSE_Y`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  $(`THEN_Y`);
} else {
  $(`ELSE_Y`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
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
let x = $(false);
let y = !x;
if (x) {
  y = true;
} else {
  y = 0;
}
if (y) {
  $(`THEN_Y`);
} else {
  $(`ELSE_Y`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'ELSE_Y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
