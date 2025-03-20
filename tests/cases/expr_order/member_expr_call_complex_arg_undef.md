# Preval test case

# member_expr_call_complex_arg_undef.md

> Expr order > Member expr call complex arg undef
>
> calling method with property arg should resolve in correct order (and throw when obj is undefined)

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

## Input

`````js filename=intro
var a, x;
a.b(x.y);
`````


## Settled


`````js filename=intro
undefined.b;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.b;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.b;
throw "[Preval]: Can not reach here";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
