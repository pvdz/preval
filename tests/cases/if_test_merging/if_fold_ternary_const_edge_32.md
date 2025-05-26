# Preval test case

# if_fold_ternary_const_edge_32.md

> If test merging > If fold ternary const edge 32
>
> Edge Case 32: Scenario C - y = [...arr] in then

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let arr = [1,2];

if (x) {
  // x is true, y was false
  y = [...arr]; // y becomes truthy (ArrayExpression)
} else {
  // x is false, y was true. Not reassigned.
}

// y is always truthy
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
let arr = [1,2];
if (x) {
  y = [...arr];
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
let arr = [1, 2];
if (x) {
  y = [...arr];
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


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
