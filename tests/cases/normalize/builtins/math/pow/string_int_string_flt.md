# Preval test case

# string_int_string_flt.md

> Normalize > Builtins > Math > Pow > String int string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3', '5.7'));
`````


## Settled


`````js filename=intro
$(524.3136350338262);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(524.3136350338262);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 524.3136350338262 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 524.3136350338262;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 524.3136350338262
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
