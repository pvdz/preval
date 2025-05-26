# Preval test case

# if_fold_ternary_const_edge_38.md

> If test merging > If fold ternary const edge 38
>
> Edge Case 38: NO CHANGE - varDeclNode is after controlIfNode

## Input

`````js filename=intro
let x = $(true);

if (x) { // Control If
  // y would not be in scope here for y = true if declared later
  // but the rule finds var decl based on targetIf test name
  // Assume y_temp = true and then let y = !x happens later
  // This structure is a bit artificial for the rule to hit the PID check part.
} else {
}

let y = !x; // varDeclNode is here

if (y) { // targetIfNode
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE due to varDecl < controlIf PID check failure):
let x = $(true);
if (x) {
} else {
}
let y = !x;
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
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE" );
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
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
