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

## Pre Normal


`````js filename=intro
let arr = [1, 2, 3, 4];
$(arr.pop());
const rra = arr.reverse();
if ($) {
  arr = $;
}
$(rra);
`````

## Normalized


`````js filename=intro
let arr = [1, 2, 3, 4];
const tmpCalleeParam = arr.pop();
$(tmpCalleeParam);
const rra = arr.reverse();
if ($) {
  arr = $;
  $(rra);
} else {
  $(rra);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 4 );
const a = [ 3, 2, 1 ];
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
