# Preval test case

# reduce_some_callback_not_function.md

> Array methods > Reduce > Ai > Reduce some callback not function
>
> Test: Array.reduce with non-function callback

## Input

`````js filename=intro
try {
  const x = [1,2].reduce(null);
  $(x);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## Settled


`````js filename=intro
try {
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2];
  const x /*:array*/ /*truthy*/ = $dotCall($array_reduce, tmpMCOO, `reduce`, null);
  $(x);
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $($dotCall($array_reduce, [1, 2], `reduce`, null));
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = [ 1, 2 ];
  const b = $dotCall( $array_reduce, a, "reduce", null );
  $( b );
}
catch (c) {
  const d = c instanceof TypeError;
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpMCOO = [1, 2];
  const tmpMCF = tmpMCOO.reduce;
  const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, null);
  $(x);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_reduce
- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
