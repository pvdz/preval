# Preval test case

# if_test_else_inv_test_delayed.md

> If test nested > If test else inv test delayed

## Input

`````js filename=intro
if (x) {
  $('then');
} else {
  const arr = []; // This blocks the simple heuristic "first expr of the block"
  const y = !x;
  arr.push(y);
  $(arr);
}
`````


## Settled


`````js filename=intro
if (x) {
  $(`then`);
} else {
  const arr /*:array*/ = [true];
  $(arr);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x) {
  $(`then`);
} else {
  $([true]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (x) {
  $( "then" );
}
else {
  const a = [ true ];
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (x) {
  $(`then`);
} else {
  const arr = [];
  const y = true;
  const tmpMCF = arr.push;
  $dotCall(tmpMCF, arr, `push`, y);
  $(arr);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
