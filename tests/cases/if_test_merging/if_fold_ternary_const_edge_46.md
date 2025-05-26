# Preval test case

# if_fold_ternary_const_edge_46.md

> If test merging > If fold ternary const edge 46
>
> Edge Case 46: NO CHANGE - controlIf.test is (x || y)

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x || y) { // controlIf test is complex
  y = true;
} else {
  y = false;
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
if (x || y) {
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
let tmpIfTest = x;
if (tmpIfTest) {
} else {
  tmpIfTest = y;
}
if (tmpIfTest) {
  y = true;
} else {
  y = false;
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
