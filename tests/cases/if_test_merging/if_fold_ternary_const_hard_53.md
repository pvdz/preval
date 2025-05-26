# Preval test case

# if_fold_ternary_const_hard_53.md

> If test merging > If fold ternary const hard 53
>
> Hard Case 53: NO CHANGE - y assigned via nested ternary in then: y = cond ? true : {}

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let cond = $(false);

if (x) {
  // x is true, y was false.
  y = cond ? true : {}; // RHS is ConditionalExpression. Rule won't analyze for truthiness.
} else {
  // x is false, y was true. Not reassigned.
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
let cond = $(false);
if (x) {
  y = cond ? true : {};
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
let y /*:unknown*/ = !x;
const cond /*:unknown*/ = $(false);
if (x) {
  if (cond) {
    y = true;
  } else {
    y = {};
  }
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
const cond = $(false);
if (x) {
  if (cond) {
    y = true;
  } else {
    y = {};
  }
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
const c = $( false );
if (a) {
  if (c) {
    b = true;
  }
  else {
    b = {};
  }
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
let cond = $(false);
if (x) {
  if (cond) {
    y = true;
  } else {
    y = {};
  }
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
