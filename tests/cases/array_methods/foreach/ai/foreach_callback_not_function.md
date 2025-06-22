# Preval test case

# foreach_callback_not_function.md

> Array methods > Foreach > Ai > Foreach callback not function
>
> Test: Array.forEach with non-function callback

## Input

`````js filename=intro
// Input: [1,2].forEach(null)
// Expected: throws TypeError
try {
  [1,2].forEach(null);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## Settled


`````js filename=intro
try {
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2];
  $dotCall($array_forEach, tmpMCOO, `forEach`, null);
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $dotCall($array_forEach, [1, 2], `forEach`, null);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = [ 1, 2 ];
  $dotCall( $array_forEach, a, "forEach", null );
}
catch (b) {
  const c = b instanceof TypeError;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpMCOO = [1, 2];
  const tmpMCF = tmpMCOO.forEach;
  $dotCall(tmpMCF, tmpMCOO, `forEach`, null);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_forEach
- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


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
