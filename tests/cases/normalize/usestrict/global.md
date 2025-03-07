# Preval test case

# global.md

> Normalize > Usestrict > Global
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
"use strict";

$();
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
`use strict`;
$();
`````

## Normalized


`````js filename=intro
$();
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
