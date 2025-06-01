# Preval test case

# ai_rule306_unused_catch_binding_side_effect.md

> Ai > Ai3 > Ai rule306 unused catch binding side effect
>
> Test: Unused catch binding 'e' where the catch block itself has a side effect.

## Input

`````js filename=intro
// Expected: try { throw $('error'); } catch { $('caught'); } $('done');
try {
  throw $('error');
} catch (e) {
  $('caught'); // e is not used
}
$('done');
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg /*:unknown*/ = $(`error`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught`);
}
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg = $(`error`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught`);
}
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "error" );
  throw a;
}
catch (b) {
  $( "caught" );
}
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpThrowArg = $(`error`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught`);
}
$(`done`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'error'
 - 2: 'caught'
 - 3: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
