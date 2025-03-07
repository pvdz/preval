# Preval test case

# unused_label_truthy_if.md

> Labels > Unused label truthy if
>
> Labels should not throw

## Input

`````js filename=intro
foo: if (true) $(1);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
foo: if (true) $(1);
`````

## Normalized


`````js filename=intro
$(1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
