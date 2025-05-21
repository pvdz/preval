# Preval test case

# catch.md

> Arr mutation > Catch
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try');
} catch (e) {
  $('catch', blob.shift());
}
$('after', blob)
`````


## Settled


`````js filename=intro
const blob /*:array*/ = [1, 2, 3];
try {
  $(`try`);
} catch (e) {
  const tmpCalleeParam /*:unknown*/ = $dotCall($array_shift, blob, `shift`);
  $(`catch`, tmpCalleeParam);
}
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = [1, 2, 3];
try {
  $(`try`);
} catch (e) {
  $(`catch`, $dotCall($array_shift, blob, `shift`));
}
$(`after`, blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
try {
  $( "try" );
}
catch (b) {
  const c = $dotCall( $array_shift, a, "shift" );
  $( "catch", c );
}
$( "after", a );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try'
 - 2: 'after', [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
