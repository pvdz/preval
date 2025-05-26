# Preval test case

# if_fold_ternary_const_edge_27.md

> If test merging > If fold ternary const edge 27
>
> Edge Case 27: NO CHANGE - y assigned unknown func_result() in then

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
function func_result(){ return $(true); }

if (x) {
  // x is true, y was false
  y = func_result(); // yMadeTruthyInThen should remain false
} else {
  // x is false, y was true. Not reassigned.
}

// y is not consistently truthy (depends on func_result)
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change by this rule):
let x = $(true);
let y = !x;
function func_result(){ return $(true); }
if (x) {
  y = func_result();
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
let y /*:unknown*/ /*ternaryConst*/ = !x;
if (x) {
  y = $(true);
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
if (x) {
  y = $(true);
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
  b = $( true );
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
  const tmpReturnArg = $(true);
  return tmpReturnArg;
};
let x = $(true);
let y = !x;
if (x) {
  y = func_result();
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
 - 2: true
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
