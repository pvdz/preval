# Preval test case

# with_ident_builtin.md

> Object literal > Inlining > With ident builtin
>
>

## Input

`````js filename=intro
const obj = {f: Array};
$(obj.f);
`````


## Settled


`````js filename=intro
$($array_constructor);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($array_constructor);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $array_constructor );
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
