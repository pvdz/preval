# Preval test case

# dotcall_final_func.md

> Object literal > Inlining > Dotcall final func
>
>

## Input

`````js filename=intro
const f = function(){};
const objlit = {f};
const x = objlit.f;
$('attempt to distract'); // throws off a simple dotcall simplfication heuristic
$dotCall(f, objlit, undefined)
`````


## Settled


`````js filename=intro
$(`attempt to distract`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`attempt to distract`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "attempt to distract" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'attempt to distract'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
