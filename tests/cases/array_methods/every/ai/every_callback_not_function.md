# Preval test case

# every_callback_not_function.md

> Array methods > Every > Ai > Every callback not function
>
> Test: Array.every with non-function callback

## Input

`````js filename=intro
try {
  const x = [1,2].every(null);
  $(x);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## Settled


`````js filename=intro
try {
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2];
  const x /*:boolean*/ = $dotCall($array_every, tmpMCOO, `every`, null);
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
  $($dotCall($array_every, [1, 2], `every`, null));
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = [ 1, 2 ];
  const b = $dotCall( $array_every, a, "every", null );
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
  const tmpMCF = tmpMCOO.every;
  const x = $dotCall(tmpMCF, tmpMCOO, `every`, null);
  $(x);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_every
- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_every


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
