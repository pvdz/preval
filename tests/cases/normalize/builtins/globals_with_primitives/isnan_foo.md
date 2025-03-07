# Preval test case

# isnan_foo.md

> Normalize > Builtins > Globals with primitives > Isnan foo
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(isNaN("foo"));
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$(isNaN(`foo`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
