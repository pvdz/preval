# Preval test case

# if_fold_ternary_const_hard_63.md

> If test merging > If fold ternary const hard 63
>
> Hard Case 63: Scenario C - Busy controlIf.then branch

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let a=0,b=0,c=0;

if (x) {
  // x is true, y was false.
  a = 1; b = 2 / a; c = a + b;
  y = {}; // y made truthy
  a = b = c = 0;
} else {
  // x is false, y was true. Not reassigned.
}

// y is consistently truthy.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
let a=0,b=0,c=0;
if (x) {
  a = 1; b = 2 / a; c = a + b;
  y = {};
  a = b = c = 0;
} else {}
{ // Simplified from if(y)
  $('THEN');
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
let x = $(true);
let y = !x;
let a = 0;
let b = 0;
let c = 0;
if (x) {
  a = 1;
  b = 2 / a;
  c = a + b;
  y = {};
  c = 0;
  const tmpNestedComplexRhs = c;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
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
