# Preval test case

# number_fl_string_int.md

> Normalize > Builtins > Math > Pow > Number fl string int
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3.3, '4'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_pow(3.3, `4`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_pow(3.3, `4`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Math_pow( 3.3, "4" );
$( a );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 118.59209999999997
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
