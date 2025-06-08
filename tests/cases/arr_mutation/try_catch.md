# Preval test case

# try_catch.md

> Arr mutation > Try catch
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try', blob.shift());
} catch {
  $('catch', blob.shift());
}
$('after', blob)
`````


## Settled


`````js filename=intro
const blob /*:array*/ /*truthy*/ = [2, 3];
try {
  $(`try`, 1);
} catch (e) {
  const tmpCalleeParam$1 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, blob, `shift`);
  $(`catch`, tmpCalleeParam$1);
}
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = [2, 3];
try {
  $(`try`, 1);
} catch (e) {
  $(`catch`, $dotCall($array_shift, blob, `shift`));
}
$(`after`, blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3 ];
try {
  $( "try", 1 );
}
catch (b) {
  const c = $dotCall( $array_shift, a, "shift" );
  $( "catch", c );
}
$( "after", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = [1, 2, 3];
try {
  const tmpMCF = blob.shift;
  let tmpCalleeParam = $dotCall(tmpMCF, blob, `shift`);
  $(`try`, tmpCalleeParam);
} catch (e) {
  const tmpMCF$1 = blob.shift;
  let tmpCalleeParam$1 = $dotCall(tmpMCF$1, blob, `shift`);
  $(`catch`, tmpCalleeParam$1);
}
$(`after`, blob);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try', 1
 - 2: 'after', [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
