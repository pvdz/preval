# Preval test case

# complex_lhs.md

> Normalize > Expressions > Complex lhs
>
> Lhs of assignment can have side effects too

## Input

`````js filename=intro
$({}).foo = 10;
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam);
tmpAssignMemLhsObj.foo = 10;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemLhsObj = $({});
tmpAssignMemLhsObj.foo = 10;
`````

## Pre Normal


`````js filename=intro
$({}).foo = 10;
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = {};
const tmpAssignMemLhsObj = $(tmpCalleeParam);
tmpAssignMemLhsObj.foo = 10;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( a );
b.foo = 10;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
