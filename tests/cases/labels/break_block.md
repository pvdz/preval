# Preval test case

# break_block.md

> Labels > Break block
>
> Labels should not throw

## Input

`````js filename=intro
foo: {
  break foo;
}
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
foo: {
  break foo;
}
`````

## Normalized


`````js filename=intro

`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
