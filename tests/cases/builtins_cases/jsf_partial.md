# Preval test case

# jsf_partial.md

> Builtins cases > Jsf partial
>
> This is from a jsfk case

## Input

`````js filename=intro
const arr_inner1 = [];
const arr_outer1 = [arr_inner1];
const arr_inner2 = [];
const arr_outer2 = [arr_inner2];
const arrs = arr_outer1.concat(arr_outer2);
const comma = $coerce(arrs, `plustr`);
const the_return_part1 = `return"$(1${comma}`;
const return_12 = `${the_return_part1} 2)"`;
const tmpCallComplexCallee = $dotCall(Function, $array_flat, 'flat', return_12);
const tmpCalleeParam = tmpCallComplexCallee();
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
$(`\$(1, 2)`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\$(1, 2)`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "$(1, 2)" );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) free with zero args, we can eliminate this?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$(1, 2)'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
