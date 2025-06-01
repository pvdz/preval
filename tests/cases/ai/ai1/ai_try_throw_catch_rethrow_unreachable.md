# Preval test case

# ai_try_throw_catch_rethrow_unreachable.md

> Ai > Ai1 > Ai try throw catch rethrow unreachable
>
> Test: try-catch with only a throw in try and catch does something then re-throws.

## Input

`````js filename=intro
// Expected: const $$0 = $('err1'); $('caught_it'); throw $$0;
try {
  throw $('err1');
} catch (e) {
  $('caught_it');
  throw e;
}
$('after');
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg /*:unknown*/ = $(`err1`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught_it`);
  throw e;
}
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg = $(`err1`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught_it`);
  throw e;
}
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "err1" );
  throw a;
}
catch (b) {
  $( "caught_it" );
  throw b;
}
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpThrowArg = $(`err1`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught_it`);
  throw e;
}
$(`after`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'err1'
 - 2: 'caught_it'
 - eval returned: ('<crash[ err1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
