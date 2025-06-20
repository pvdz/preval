# Preval test case

# base_function.md

> Type tracked > Typeof > Base function
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = function (){};
$(typeof x);
`````


## Settled


`````js filename=intro
$(`function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
