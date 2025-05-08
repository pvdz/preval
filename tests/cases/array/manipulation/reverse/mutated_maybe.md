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
  const tmpCalleeParam /*:unknown*/ = $dotCall($array_pop, arr, `pop`);
  $(tmpCalleeParam);
  $dotCall($array_reverse, arr, `reverse`);
  $(arr);
} else {
  $dotCall($array_reverse, arr, `reverse`);
  $(arr);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  $($dotCall($array_pop, arr, `pop`));
  $dotCall($array_reverse, arr, `reverse`);
  $(arr);
} else {
  $dotCall($array_reverse, arr, `reverse`);
  $(arr);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
if ($) {
  const b = $dotCall( $array_pop, a, "pop" );
  $( b );
  $dotCall( $array_reverse, a, "reverse" );
  $( a );
}
else {
  $dotCall( $array_reverse, a, "reverse" );
  $( a );
}
`````


## Todos triggered


- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) access object property that also exists on prototype? $array_pop
- (todo) access object property that also exists on prototype? $array_reverse
- (todo) phase1_1 support this array method call? $array_reverse
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
