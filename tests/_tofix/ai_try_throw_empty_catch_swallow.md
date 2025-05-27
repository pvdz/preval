# Preval test case

# ai_try_throw_empty_catch_swallow.md

> Tofix > ai try throw empty catch swallow
>
> Test: try-throw with an empty catch block, error swallowed.

AI was wrong in expecting the try to be eligible for elimination, however there's a hidden rule here that we could do:
"When the last statement in a try-block throws and its catch is empty, then the `throw` is a noop and can be replaced by its argument"

## Input

`````js filename=intro
// Expected: $('A'); $('B');
try {
  throw $('A');
} catch (e) {
  // empty catch, error is swallowed
}
$('B');
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg /*:unknown*/ = $(`A`);
  throw tmpThrowArg;
} catch (e) {}
$(`B`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg = $(`A`);
  throw tmpThrowArg;
} catch (e) {}
$(`B`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "A" );
  throw a;
}
catch (b) {

}
$( "B" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpThrowArg = $(`A`);
  throw tmpThrowArg;
} catch (e) {}
$(`B`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
