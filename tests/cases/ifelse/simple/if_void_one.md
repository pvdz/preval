# Preval test case

# if_void_one.md

> Ifelse > Simple > If void one
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (void 1) $();
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
if (void 1) $();
`````

## Normalized


`````js filename=intro
const tmpIfTest = undefined;
if (tmpIfTest) {
  $();
} else {
}
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
