# Preval test case

# arr_mutation_hard_len_inf.md

> Arr mutation > Arr mutation hard len inf
>
> There was a bug in arr_mutation where it would replace the
> initial `[0]` with `[d]`, introducing a TDZ throw.
> But in this case, especially with a back-to-back def and update, 
> we should still be able to do it. Just have to make sure we don't introduce
> another bug in arr_mutation

## Input

`````js filename=intro
let a = [1, 2, 3, 4, 5];
const d = $();
a.length = Infinity;
$(a);
`````


## Settled


`````js filename=intro
$();
const a /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
a.length = $Number_POSITIVE_INFINITY;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
const a = [1, 2, 3, 4, 5];
a.length = $Number_POSITIVE_INFINITY;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = [ 1, 2, 3, 4, 5 ];
a.length = $Number_POSITIVE_INFINITY;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = [1, 2, 3, 4, 5];
const d = $();
a.length = $Number_POSITIVE_INFINITY;
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ Invalid array length ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
