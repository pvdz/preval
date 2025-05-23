# Preval test case

# class_expr_stmt_extends.md

> Normalize > Class > Class expr stmt extends
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

## Input

`````js filename=intro
(class x extends $(Number) {});
`````


## Settled


`````js filename=intro
$($number_constructor);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($number_constructor);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $number_constructor );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpClassSuper = $($number_constructor);
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
