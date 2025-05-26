# Preval test case

# if_fold_ternary_const_hard_57.md

> If test merging > If fold ternary const hard 57
>
> Hard Case 57: NO CHANGE - y assigned x.prop in then (MemberExpression)

## Input

`````js filename=intro
let x = { prop: $(true) }; // x is an object, used as controlVarName (this is unusual)
let y = !x; // y is !{...} -> false.

// The rule expects controlVarName to be an Identifier that is the test of controlIf.
// Here, `x` is the controlVarName based on `let y = !x`.
// The controlIf `if(x)` is fine.

if (x) { // controlIfNode.test is `x` (Identifier)
  // x is truthy, y was false.
  y = x.prop; // RHS is MemberExpression. yMadeTruthyInThen remains false.
} else {
  // x is falsy (hypothetically for else path), y was true. Not reassigned.
}

// No change by this rule.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = { prop: $(true) };
let y = !x;
if (x) {
  y = x.prop;
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
const tmpObjLitVal /*:unknown*/ = $(true);
if (tmpObjLitVal) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "THEN" );
}
else {
  $( "ELSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(true);
let x = { prop: tmpObjLitVal };
let y = !x;
if (x) {
  y = x.prop;
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
