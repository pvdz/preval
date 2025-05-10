# Preval test case

# base.md

> Frfr tricks > No args > Base
>
> $frfr with no args can be resolved

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
const t /*:string*/ = $dotCall($string_repeat, `005`, `repeat`, 2);
$(t);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_repeat, `005`, `repeat`, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_repeat, "005", "repeat", 2 );
$( a );
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
