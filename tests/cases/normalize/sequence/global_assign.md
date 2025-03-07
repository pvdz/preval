# Preval test case

# global_assign.md

> Normalize > Sequence > Global assign
>
> Special case for toplevel assignments to a property of a sequence

This wouldn't occur in actual code but we will see it as an artifact of other transforms (namely, the member expression).

## Input

`````js filename=intro
($(1), $(2)).x = 1;
`````

## Settled


`````js filename=intro
$(1);
const tmpAssignMemLhsObj /*:unknown*/ = $(2);
tmpAssignMemLhsObj.x = 1;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignMemLhsObj = $(2);
tmpAssignMemLhsObj.x = 1;
`````

## Pre Normal


`````js filename=intro
($(1), $(2)).x = 1;
`````

## Normalized


`````js filename=intro
$(1);
const tmpAssignMemLhsObj = $(2);
tmpAssignMemLhsObj.x = 1;
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
a.x = 1;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
