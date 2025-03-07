# Preval test case

# class_extending_string.md

> Normalize > Class > Class extending string
>
> This broke something at some point in time :)

## Input

`````js filename=intro
class x extends $(String) {}
`````

## Settled


`````js filename=intro
$(String);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String);
`````

## Pre Normal


`````js filename=intro
let x = class extends $(String) {};
`````

## Normalized


`````js filename=intro
const tmpClassSuper = $(String);
let x = class extends tmpClassSuper {};
`````

## PST Settled
With rename=true

`````js filename=intro
$( String );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
