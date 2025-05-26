# Preval test case

# if_fold_ternary_const_edge_28.md

> If test merging > If fold ternary const edge 28
>
> Edge Case 28: NO CHANGE - y assigned unknown func_result() in else

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
function func_result(){ return $(false); }

if (x) {
  // x is true, y was false. Not reassigned.
} else {
  // x is false, y was true
  y = func_result(); // yMadeFalsyInElse should remain false
}

// y is not consistently falsy
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change by this rule):
let x = $(true);
let y = !x;
function func_result(){ return $(false); }
if (x) {
} else {
  y = func_result();
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
const x /*:unknown*/ = $(true);
let y /*:unknown*/ /*ternaryConst*/ = !x;
if (x) {
} else {
  y = $(false);
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
if (!x) {
  y = $(false);
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

}
else {
  b = $( false );
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
let func_result = function () {
  debugger;
  const tmpReturnArg = $(false);
  return tmpReturnArg;
};
let x = $(true);
let y = !x;
if (x) {
} else {
  y = func_result();
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
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
