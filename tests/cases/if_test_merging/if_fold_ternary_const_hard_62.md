# Preval test case

# if_fold_ternary_const_hard_62.md

> If test merging > If fold ternary const hard 62
>
> Hard Case 62: NO CHANGE - controlIf condition is !x

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (!x) { // controlIf test is UnaryExpression, not Identifier x
  y = true; 
} else {
  y = false;
}

// Rule expects controlIf.test to be Identifier `x`.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
if (!x) {
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
const x /*:unknown*/ = $(true);
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE" );
}
else {
  $( "THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
  y = false;
} else {
  y = true;
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
