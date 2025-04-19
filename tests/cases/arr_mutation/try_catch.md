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
const blob /*:array*/ = [2, 3];
try {
  $(`try`, 1);
} catch (e) {
  const tmpCalleeParam$1 /*:unknown*/ = $dotCall($array_shift, blob, `shift`);
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


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) outline any args for tdz


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
