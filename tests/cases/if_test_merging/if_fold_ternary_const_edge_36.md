# Preval test case

# if_fold_ternary_const_edge_36.md

> If test merging > If fold ternary const edge 36
>
> Edge Case 36: NO CHANGE - y initialized with !y (varDeclNode.init.argument is y itself)

## Options

// We should detect the tdz but we don't?
- skipEval

## Input

`````js filename=intro
// TDZ case
let y = !y;

if (y) { // controlIfNode, test is y (controlVarName)
  y = true; 
} else {
  y = false;
}

// Rule checks `varDeclNode.init.argument.type !== 'Identifier'`, which is true (it is an Identifier).
// Rule checks `varDeclNode.init.argument.name === controlVarName`. If y = !y, then controlVarName is y.
// The pattern `let y = !x` is key. Here `x` would be `y`.
// The logic `if (prevNode.test.name === controlVarName)` means `if(y)` is the controlIf.
// This is too self-referential and the init `!y` means the value of `y` is unknown for the `let`.
// Preval might simplify `let y = !y` to something based on undefined behavior or type error.
// Assuming the rule's structural checks for `let y = !<Identifier>` make it not apply.
if (y) { // targetIfNode
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule, due to `let y = !y;` not fitting `let y = !x` where x is a distinct ident):
let y = !y;
if (y) {
  y = true;
} else {
  y = false;
}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = !y;
if (y) {
  y = true;
} else {
  y = false;
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
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
