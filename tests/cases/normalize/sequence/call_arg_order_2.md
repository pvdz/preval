# Preval test case

# call_arg_order_2.md

> Normalize > Sequence > Call arg order 2
>
> In a call we can only trivially outline sequence expressions of the first arg. We can do the other ones but that requires temporary assignment of all non-ident/non-literals to ensure no side effects.

## Input

`````js filename=intro
// Second
$($(1), ($(2), $(3)));
`````

## Pre Normal


`````js filename=intro
$($(1), ($(2), $(3)));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $(1);
$(2);
const tmpCalleeParam$1 = $(3);
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
$(2);
const tmpCalleeParam$1 /*:unknown*/ = $(3);
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( 2 );
const b = $( 3 );
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 1, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
