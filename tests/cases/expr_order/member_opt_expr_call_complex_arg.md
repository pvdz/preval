# Preval test case

# member_opt_expr_call_complex_arg.md

> Expr order > Member opt expr call complex arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

## Input

`````js filename=intro
var a, x;
a?.b(x.y);
$(a, x);
`````


## Settled


`````js filename=intro
$(undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
