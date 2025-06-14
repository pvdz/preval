# Preval test case

# try.md

> Arr mutation > Try
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try', blob.shift());
} catch {
}
$('after', blob)
`````


## Settled


`````js filename=intro
try {
  $(`try`, 1);
} catch (e) {}
const blob /*:array*/ /*truthy*/ = [2, 3];
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`try`, 1);
} catch (e) {}
$(`after`, [2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "try", 1 );
}
catch (a) {

}
const b = [ 2, 3 ];
$( "after", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = [1, 2, 3];
try {
  const tmpMCF = blob.shift;
  let tmpCalleeParam = $dotCall(tmpMCF, blob, `shift`);
  $(`try`, tmpCalleeParam);
} catch (e) {}
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
