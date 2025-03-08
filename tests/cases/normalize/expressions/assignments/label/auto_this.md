# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Label > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = this;
$(a);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = undefined;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
$(undefined);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
