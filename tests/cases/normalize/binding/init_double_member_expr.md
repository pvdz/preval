# Preval test case

# init_double_member_expr.md

> Normalize > Binding > Init double member expr
>
> Binding declaration with a long init should be outlined

## Input

`````js filename=intro
let x = "foo".length.toString;
$(x);
`````


## Settled


`````js filename=intro
$($number_toString);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($number_toString);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $number_toString );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = 3;
let x = tmpCompObj.toString;
$(x);
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
