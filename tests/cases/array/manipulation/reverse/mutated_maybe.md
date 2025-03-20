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

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  $(arr.pop());
}
const rra = arr.reverse();
$(rra);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  const tmpCalleeParam = arr.pop();
  $(tmpCalleeParam);
} else {
}
const rra = arr.reverse();
$(rra);
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_pop
