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


## Todos triggered


None


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
