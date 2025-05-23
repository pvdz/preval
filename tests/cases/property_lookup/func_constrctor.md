# Preval test case

# func_constrctor.md

> Property lookup > Func constrctor
>
> Getting the constructor from a known function, whatever it is, should yield `Function`

## Input

`````js filename=intro
const x = [].flat;
const f = x.constructor;
$(f);
`````


## Settled


`````js filename=intro
$($function_constructor);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($function_constructor);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $function_constructor );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = [];
const x = tmpCompObj.flat;
const f = x.constructor;
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
