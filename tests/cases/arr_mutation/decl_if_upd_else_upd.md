# Preval test case

# decl_if_upd_else_upd.md

> Arr mutation > Decl if upd else upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
  arr[0] = 2;
}
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [];
if ($) {
  arr[0] = 1;
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
  arr[0] = 1;
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
  a[0] = 1;
  $( a );
}
else {
  a[0] = 2;
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
  $(arr);
} else {
  arr[0] = 2;
  $(arr);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
