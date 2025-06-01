# Preval test case

# ai_dead_else_if_throws_opaque_cond.md

> Ai > Ai1 > Ai dead else if throws opaque cond
>
> Test: Dead else branch due to throw in if when condition is opaque.

## Input

`````js filename=intro
// Expected: const $$0 = $('cond'); if ($$0) { const $$1 = $('err'); throw $$1; } $('reachable_B');
if ($('cond')) {
  throw $('err');
} else {
  $('unreachable_A');
}
$('reachable_B');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  const tmpThrowArg /*:unknown*/ = $(`err`);
  throw tmpThrowArg;
} else {
  $(`unreachable_A`);
  $(`reachable_B`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  const tmpThrowArg = $(`err`);
  throw tmpThrowArg;
} else {
  $(`unreachable_A`);
  $(`reachable_B`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  const b = $( "err" );
  throw b;
}
else {
  $( "unreachable_A" );
  $( "reachable_B" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  const tmpThrowArg = $(`err`);
  throw tmpThrowArg;
} else {
  $(`unreachable_A`);
  $(`reachable_B`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'err'
 - eval returned: ('<crash[ err ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
