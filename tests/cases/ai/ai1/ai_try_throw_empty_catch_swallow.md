# Preval test case

# ai_try_throw_empty_catch_swallow.md

> Ai > Ai1 > Ai try throw empty catch swallow
>
> Test: try-throw with an empty catch block, error swallowed.

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
