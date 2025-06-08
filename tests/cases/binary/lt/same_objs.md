# Preval test case

# same_objs.md

> Binary > Lt > Same objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
$(x < x);
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
x < x;
let tmpCalleeParam = false;
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
