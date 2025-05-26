# Preval test case

# mutated.md

> Array > Manipulation > Reverse > Mutated
>
> The pop will resolve first so the reverse works

## Input

`````js filename=intro
let arr = [1, 2, 3, 4];
$(arr.pop());
const rra = arr.reverse();
if ($) {
  arr = $
}
$(rra);
`````


## Settled


`````js filename=intro
$(4);
const arr /*:array*/ = [3, 2, 1];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$([3, 2, 1]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
const a = [ 3, 2, 1 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3, 4];
const tmpMCF = arr.pop;
let tmpCalleeParam = $dotCall(tmpMCF, arr, `pop`);
$(tmpCalleeParam);
const tmpMCF$1 = arr.reverse;
const rra = $dotCall(tmpMCF$1, arr, `reverse`);
if ($) {
  arr = $;
  $(rra);
} else {
  $(rra);
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) arr mutation may be able to inline this method: tmpMCF$1
- (todo) outline any args for tdz
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_pop


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: [3, 2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
