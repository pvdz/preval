# Preval test case

# reduceright_callback_not_function.md

> Array methods > Reduceright > Ai > Reduceright callback not function
>
> Test: Array.reduceRight with non-function callback

## Input

`````js filename=intro
try {
  const x = [1,2].reduceRight(null);
  $(x);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## Settled


`````js filename=intro
try {
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2];
  const x /*:array*/ /*truthy*/ = $dotCall($array_reduceRight, tmpMCOO, `reduceRight`, null);
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
  $($dotCall($array_reduceRight, [1, 2], `reduceRight`, null));
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = [ 1, 2 ];
  const b = $dotCall( $array_reduceRight, a, "reduceRight", null );
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
  const tmpMCF = tmpMCOO.reduceRight;
  const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, null);
  $(x);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_reduceRight
- (todo) array reads var statement with init CallExpression
- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) type trackeed tricks can possibly support static $array_reduceRight


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
