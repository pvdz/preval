# Preval test case

# if_fold_ternary_const_hard_59.md

> If test merging > If fold ternary const hard 59
>
> Hard Case 59: NO CHANGE - y assigned in nested if in then

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let nested_cond = $(false);

if (x) {
  // x is true, y was false.
  if (nested_cond) {
    y = true; // Assignment is conditional.
  }
} else {
  // x is false, y was true. Not reassigned.
}

// y's state in `then` path is uncertain.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
let nested_cond = $(false);
if (x) {
  if (nested_cond) {
    y = true;
  }
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
let y /*:boolean*/ /*ternaryConst*/ = !x;
const nested_cond /*:unknown*/ = $(false);
if (x) {
  if (nested_cond) {
    y = true;
  } else {
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
const nested_cond = $(false);
if (x) {
  if (nested_cond) {
    y = true;
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
let nested_cond = $(false);
if (x) {
  if (nested_cond) {
    y = true;
  } else {
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
 - 3: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
