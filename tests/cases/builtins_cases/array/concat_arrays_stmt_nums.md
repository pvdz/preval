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


## PST Settled
With rename=true

`````js filename=intro

`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $array_concat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
