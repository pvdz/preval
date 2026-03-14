# Preval test case

# math_pi_lost.md

> Free > Math pi lost
>
> For some reason this was letting math.pi into pcode when it didn't want it

## Input

`````js filename=intro
const a/*:unknown*/ = 1;
const b/*:unknown*/ = $Math_PI;
const c/*:unknown*/ = a + b;
$(c);
`````


## Settled


`````js filename=intro
$(4.141592653589793);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4.141592653589793);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4.141592653589793 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = 1;
const b = $Math_PI;
const c = a + b;
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4.141592653589793
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
