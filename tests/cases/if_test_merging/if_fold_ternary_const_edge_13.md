# Preval test case

# if_fold_ternary_const_edge_13.md

> If test merging > If fold ternary const edge 13
>
> Edge Case 13: NO CHANGE - targetIfNode.test is not an Identifier

## Input

`````js filename=intro
let x = $(true);
let y = !x;

if (x) {
  y = true;
} else {
  // y not reassigned
}

// Rule shouldn't apply
if (y && $(true)) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (no change to second if):
let x = $(true);
let y = !x;
if (x) {
  y = true;
} else {}
if (y && $(true)) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(true);
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(true);
if (tmpClusterSSA_tmpIfTest) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
if ($(true)) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
const a = $( true );
if (a) {
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
if (x) {
  y = true;
} else {
}
let tmpIfTest = y;
if (tmpIfTest) {
  tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`THEN`);
  } else {
    $(`ELSE`);
  }
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
