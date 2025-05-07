# Preval test case

# decl_else_upd.md

> Arr mutation > Decl else upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
if ($) {
} else {
  arr[0] = 2;
}
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [];
if ($) {
  $(arr);
} else {
  arr[0] = 2;
  $(arr);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [];
if ($) {
  $(arr);
} else {
  arr[0] = 2;
  $(arr);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
if ($) {
  $( a );
}
else {
  a[0] = 2;
  $( a );
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
