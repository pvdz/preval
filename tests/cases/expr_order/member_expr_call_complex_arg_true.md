# Preval test case

# member_expr_call_complex_arg_true.md

> Expr order > Member expr call complex arg true
>
> calling method with property arg should resolve in correct order

## Input

`````js filename=intro
var a = true, x = false;
a.b(x.y);
`````


## Settled


`````js filename=intro
const tmpMCF /*:unknown*/ = $Boolean_prototype.b;
const tmpMCP /*:unknown*/ = $Boolean_prototype.y;
$dotCall(tmpMCF, true, `b`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($Boolean_prototype.b, true, `b`, $Boolean_prototype.y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Boolean_prototype.b;
const b = $Boolean_prototype.y;
$dotCall( a, true, "b", b );
`````


## Todos triggered


- (todo) convert this Boolean trap to the symbo pattern


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
