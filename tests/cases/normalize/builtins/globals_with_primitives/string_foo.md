# Preval test case

# string_foo.md

> Normalize > Builtins > Globals with primitives > String foo
>
> Calling String on a primitive should resolve

## Input

`````js filename=intro
$(String("foo"));
`````

## Settled


`````js filename=intro
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````

## Pre Normal


`````js filename=intro
$(String(`foo`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `foo`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
