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
const tmpCalleeParam /*:number*/ = $dotCall($Math_pow, Math, `pow`, `3`, `5.7`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($Math_pow, Math, `pow`, `3`, `5.7`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $Math_pow, Math, "pow", "3", "5.7" );
$( a );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow


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
