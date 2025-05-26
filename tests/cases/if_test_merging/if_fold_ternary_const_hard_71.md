# Preval test case

# if_fold_ternary_const_hard_71.md

> If test merging > If fold ternary const hard 71
>
> Hard Case 71: NO CHANGE - y assigned new MyClass() in then

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
class MyClass {}

if (x) {
  // x is true, y was false.
  y = new MyClass(); // RHS is NewExpression. yMadeTruthyInThen=false.
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
class MyClass {}
if (x) {
  y = new MyClass();
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
  const MyClass /*:class*/ = class {};
  y = new MyClass();
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
  const MyClass = class {};
  y = new MyClass();
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
  const c = class   {

  };
  b = new c();
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
let MyClass = class {};
if (x) {
  y = new MyClass();
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
