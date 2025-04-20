# Preval test case

# create_func_dotcall.md

> Function > Constructor > Create func dotcall
>
> Creating a function and calling it...

It should be able to resolve this object case and revert the "$dotCall" case to a regular call.

## Input

`````js filename=intro
const obj = {Function};
const f = obj.Function(a, b, c, d);
$(f());
`````


## Settled


`````js filename=intro
const f /*:function*/ = $function_constructor(a, b, c, d);
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = $function_constructor(a, b, c, d);
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const e = $function_constructor( a, b, c, d );
const f = e();
$( f );
`````


## Todos triggered


None


## Globals


BAD@! Found 4 implicit global bindings:

a, b, c, d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
