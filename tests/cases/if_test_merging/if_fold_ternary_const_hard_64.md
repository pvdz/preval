# Preval test case

# if_fold_ternary_const_hard_64.md

> If test merging > If fold ternary const hard 64
>
> Hard Case 64: NO CHANGE - y assigned to non-builtin global `window`

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

// Assume `window` is a global but not in the `isBuiltin` list for this rule, or its truthiness isn't hardcoded.
if (typeof window === 'undefined') var window = { foo: 1 }; // Ensure window exists for test

if (x) {
  // x is true, y was false.
  y = window; // yMadeTruthyInThen = false if window not handled as known truthy.
} else {
  // x is false, y was true. Not reassigned.
}

// No change by this rule if `window` isn't specifically handled.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
if (typeof window === 'undefined') var window = { foo: 1 };
if (x) {
  y = window;
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
$(true);
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let window$1 = undefined;
let x = $(true);
let y = !x;
const tmpBinLhs = typeof window$1;
const tmpIfTest = tmpBinLhs === `undefined`;
if (tmpIfTest) {
  window$1 = { foo: 1 };
} else {
}
if (x) {
  y = window$1;
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
