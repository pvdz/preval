# Preval test case

# concat_arrays_stmt_nums.md

> Builtins cases > Array > Concat arrays stmt nums
>
> const a = [];

## Input

`````js filename=intro
const a = [1];
const b = [2];
a.concat(b);
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
const a = [1];
const b = [2];
a.concat(b);
`````

## Normalized


`````js filename=intro
const a = [1];
const b = [2];
a.concat(b);
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_concat