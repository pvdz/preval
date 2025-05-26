# Preval test case

# if_fold_ternary_const_edge_51.md

> If test merging > If fold ternary const edge 51
>
> Edge Case 51: NO CHANGE - y modified with y++ (not AssignmentExpression for rule)

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x) {
  // x is true, y was false.
  y++;    // y becomes 1 (truthy). Rule sees this as not an AssignmentExpression.
} else {
  // x is false, y was true. Not reassigned.
}

// Rule does not detect the change to y's truthiness here.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
if (x) {
  y++;
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
if (x) {
  const tmpPostUpdArgIdent = $coerce(y, `number`);
  y = tmpPostUpdArgIdent + 1;
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
