# Preval test case

# create_func.md

> Function > Constructor > Create func
>
> Creating a function and calling it...

## Input

`````js filename=intro
const f = Function(`return 500`);
$(f());
`````


## Settled


`````js filename=intro
$(500);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(500);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 500 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  return 500;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
