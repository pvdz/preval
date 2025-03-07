# Preval test case

# empty_block.md

> Normalize > Label > Empty block
>
> Empty label body checks

## Input

`````js filename=intro
$(1);
foo: {}
$(2);
`````

## Settled


`````js filename=intro
$(1);
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````

## Pre Normal


`````js filename=intro
$(1);
foo: {
}
$(2);
`````

## Normalized


`````js filename=intro
$(1);
$(2);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
