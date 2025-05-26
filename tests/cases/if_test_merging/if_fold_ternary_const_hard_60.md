# Preval test case

# if_fold_ternary_const_hard_60.md

> If test merging > If fold ternary const hard 60
>
> Hard Case 60: NO CHANGE - y assigned (some_func(), true) in then

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
function some_func() { $('side_effect'); }

if (x) {
  // x is true, y was false.
  y = (some_func(), true); // RHS is SequenceExpression. Ends in true, but rule doesn't see that.
} else {
  // x is false, y was true. Not reassigned.
}

// No change by this rule.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
function some_func() { $('side_effect'); }
if (x) {
  y = (some_func(), true);
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
if (x) {
  $(`side_effect`);
  $(`THEN`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`side_effect`);
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
  $( "side_effect" );
  $( "THEN" );
}
else {
  $( "THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let some_func = function () {
  debugger;
  $(`side_effect`);
  return undefined;
};
let x = $(true);
let y = !x;
if (x) {
  some_func();
  y = true;
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
 - 2: 'side_effect'
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
