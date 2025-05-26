# Preval test case

# if_fold_ternary_const_hard_54.md

> If test merging > If fold ternary const hard 54
>
> Hard Case 54: NO CHANGE - y assigned via nested ternary in else: y = cond ? 0 : null

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let cond = $(true);

if (x) {
  // x is true, y was false. Not reassigned.
} else {
  // x is false, y was true.
  y = cond ? 0 : null; // RHS is ConditionalExpression. Rule won't analyze for falsiness.
}

// Rule won't simplify if(y).
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
let cond = $(true);
if (x) {
} else {
  y = cond ? 0 : null;
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
$(true);
$(true);
$(`ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(true);
$(`ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( true );
$( "ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
let cond = $(true);
if (x) {
} else {
  if (cond) {
    y = 0;
  } else {
    y = null;
  }
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
 - 2: true
 - 3: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
