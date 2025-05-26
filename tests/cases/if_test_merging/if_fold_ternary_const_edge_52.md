# Preval test case

# if_fold_ternary_const_edge_52.md

> If test merging > If fold ternary const edge 52
>
> Edge Case 52: NO CHANGE - y declared with no init, then assigned !x

## Input

`````js filename=intro
let x = $(true);
let y;

// Rule looks for varDecl for y, gets `let y;`. Its `init` is null.
// The assignment y = !x; is a separate statement.
// Rule expects `let y = !Identifier;` in one go.

if (x) {
  y = !x; // This assignment happens inside controlIf for this example to make it tricky
          // but the varDecl of y itself didn't match the pattern.
} else {
  y = !x;
}

if (y) {
  $('THEN');
} else {
  $('ELSE');
}

// More realistic test for the rule: separate assign before controlIf
let z_ctrl = $(true);
let y_target;
y_target = !z_ctrl; // Assignment not part of var decl of y_target

if (z_ctrl) {
    y_target = true;
} else {
    // y_target not reassigned
}

if (y_target) { // This is the target if
    $('RESULT_THEN');
} else {
    $('RESULT_ELSE');
}

/* Expected output (NO CHANGE for y_target case):
let z_ctrl = $(true);
let y_target;
y_target = !z_ctrl;
if (z_ctrl) {
    y_target = true;
} else {}
if (y_target) {
    $('RESULT_THEN');
} else {
    $('RESULT_ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`ELSE`);
  $(true);
  $(`RESULT_THEN`);
} else {
  $(`THEN`);
  $(true);
  $(`RESULT_THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE`);
  $(true);
  $(`RESULT_THEN`);
} else {
  $(`THEN`);
  $(true);
  $(`RESULT_THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE" );
  $( true );
  $( "RESULT_THEN" );
}
else {
  $( "THEN" );
  $( true );
  $( "RESULT_THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = undefined;
if (x) {
  y = !x;
} else {
  y = !x;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
let z_ctrl = $(true);
let y_target = undefined;
y_target = !z_ctrl;
if (z_ctrl) {
  y_target = true;
} else {
}
if (y_target) {
  $(`RESULT_THEN`);
} else {
  $(`RESULT_ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'ELSE'
 - 3: true
 - 4: 'RESULT_THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
