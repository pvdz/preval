# Preval test case

# assign_simple_simple_complex.md

> Logical > And > Assign simple simple complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 && $(2));
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(2);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$((x = 1 && $(2)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 1;
if (x) {
  x = $(2);
} else {
}
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
