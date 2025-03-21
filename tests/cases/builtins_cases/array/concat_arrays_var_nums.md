# Preval test case

# concat_arrays_var_nums.md

> Builtins cases > Array > Concat arrays var nums
>
> const a = [];

## Input

`````js filename=intro
const a = [1];
const b = [2];
const c = a.concat(b);
const d = '' + c;
$(d);
`````


## Settled


`````js filename=intro
$(`1,2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,2`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1,2" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $array_concat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1,2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
