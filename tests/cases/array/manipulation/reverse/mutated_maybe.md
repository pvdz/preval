# Preval test case

# mutated_maybe.md

> Array > Manipulation > Reverse > Mutated maybe
>
> The pop will resolve first so the reverse works

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  $(arr.pop());
}
const rra = arr.reverse();
$(rra);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
if ($) {
  const tmpCalleeParam /*:unknown*/ = arr.pop();
  $(tmpCalleeParam);
} else {
}
arr.reverse();
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  $(arr.pop());
}
arr.reverse();
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
if ($) {
  const b = a.pop();
  $( b );
}
a.reverse();
$( a );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $array_pop


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
