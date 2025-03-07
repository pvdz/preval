# Preval test case

# if_arr.md

> Ifelse > Simple > If arr
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([]) $();
`````

## Settled


`````js filename=intro
$();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````

## Pre Normal


`````js filename=intro
if ([]) $();
`````

## Normalized


`````js filename=intro
const tmpIfTest = [];
if (tmpIfTest) {
  $();
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
