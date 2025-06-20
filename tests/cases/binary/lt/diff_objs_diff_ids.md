# Preval test case

# diff_objs_diff_ids.md

> Binary > Lt > Diff objs diff ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
const y = x;
$(x < y);
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = {};
x ** 0;
x ** 0;
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = {};
x ** 0;
x ** 0;
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
a ** 0;
a ** 0;
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = {};
const y = x;
let tmpCalleeParam = x < y;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
