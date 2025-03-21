# Preval test case

# isarray_with_unknown.md

> Array > Static context > Isarray with unknown
>
> Array.isArray check

## Input

`````js filename=intro
$(Array.isArray([$(1),$(2),$(3)]));
`````

## Settled


`````js filename=intro
$(1);
$(2);
$(3);
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(3);
$(true);
`````

## Pre Normal


`````js filename=intro
$(Array.isArray([$(1), $(2), $(3)]));
`````

## Normalized


`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$1 = $(2);
const tmpArrElement$3 = $(3);
const tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpCalleeParam = $Array_isArray(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
