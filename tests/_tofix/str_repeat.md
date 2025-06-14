# Preval test case

# str_repeat.md

> Tofix > str repeat

We can resolve string repeat with primitives.
Question is how far we want to push that.

## Input

`````js filename=intro
const f = function $free() {
  const one = 100 + '5';
  const two = one.slice(1);
  return two;
}

const r = $frfr(f);
const t = r.repeat(2)
$(t);
`````


## Settled


`````js filename=intro
$(`005005`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`005005`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "005005" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function $free() {
  debugger;
  const one = `1005`;
  const tmpMCF = one.slice;
  const two = $dotCall(tmpMCF, one, `slice`, 1);
  return two;
};
const r = $frfr(f);
const tmpMCF$1 = r.repeat;
const t = $dotCall(tmpMCF$1, r, `repeat`, 2);
$(t);
`````


## Todos triggered


- (todo) We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false
- (todo) free with zero args, we can eliminate this?
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '005005'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
