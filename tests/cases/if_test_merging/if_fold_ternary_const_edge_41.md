# Preval test case

# if_fold_ternary_const_edge_41.md

> If test merging > If fold ternary const edge 41
>
> Edge Case 41: Scenario C - y assigned x in controlIf.then

## Input

`````js filename=intro
let x = $(true); // Assume x is truthy for this example analysis
let y = !x; // If x is true, y is false.

if (x) { // x is true branch
  // y (was false) is assigned x (true).
  y = x; // yMadeTruthyInThen = true (as x is known truthy or treated as such by assignment)
         // The rule currently does not look up x's truthiness, but y=x is not primitive/literal.
         // The rule currently only handles primitive/literal assignments or specific builtins for truthiness.
         // So yMadeTruthyInThen would remain FALSE for y=x.
} else { // x is false branch
  // y (was true) is not reassigned.
}

// If yMadeTruthyInThen remains false:
// Scenario C: false && (...) -> false.
// Scenario D: (!reassignedThen || (reassignedThen && !false)) && !reassignedElse -> true && false (yMadeFalsyInElse is false)
// No change based on current logic for y=x.

// Let's adjust the test to be more direct for the rule capabilities:
// What if x is a *known* truthy primitive that isn't `true` itself?
// let x_val = 1;
// let y = !x_val; // y = false
// if (x_val) { y = x_val; } else {} // y becomes 1 (truthy)
// if(y) -> then. This is Scenario C.

// Original test was fine for the rule's limitation:
// let x = $(true); let y = !x; if(x){ y=x; } else {} if(y){...}
// Here, y=x is an identifier assignment. It *should not* set yMadeTruthyInThen.
// So, yMadeTruthyInThen=false. yReassignedInThen=true.
// In else, yReassignedInElse=false. yMadeFalsyInElse=false.
// Scenario C: false && (...) -> false.
// Scenario D: (!true || (true && !false)) && false -> (false || true) && false -> false.
// NO CHANGE is correct for the current rule logic when y=x.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE for y=x by this rule's current analysis):
let x = $(true);
let y = !x;
if (x) {
  y = x;
} else {}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
let y /*:unknown*/ /*ternaryConst*/ = !x;
if (x) {
  y = x;
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
if (x) {
  y = x;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
if (a) {
  b = a;
}
if (b) {
  $( "THEN" );
}
else {
  $( "ELSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = x;
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
