# Preval test case

# returning_builtin.md

> Pcode > Returning builtin

Returning a builtin in pcode would fail at the time of writing, resulting in undefined.

## Input

`````js filename=intro
let s = "world";
$(s.constructor);
`````


## Settled


`````js filename=intro
$($string_constructor);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($string_constructor);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $string_constructor );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let s = `world`;
let tmpCalleeParam = s.constructor;
$(tmpCalleeParam);
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
