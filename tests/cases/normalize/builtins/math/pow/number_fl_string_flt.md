# Preval test case

# number_fl_string_flt.md

> Normalize > Builtins > Math > Pow > Number fl string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3.3, '4.3'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_pow(3.3, `4.3`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_pow(3.3, `4.3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Math_pow( 3.3, "4.3" );
$( a );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 169.67190716541973
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
