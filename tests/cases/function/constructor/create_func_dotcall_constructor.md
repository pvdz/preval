# Preval test case

# create_func_dotcall_constructor.md

> Function > Constructor > Create func dotcall constructor
>
> Creating a function and calling it...

The system knows `func.constructor` maps to `Function` and should be able to deal with this

## Input

`````js filename=intro
const f = (function(){}).constructor(a, b, c, d);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = function () {
  debugger;
  return undefined;
};
const tmpMCF = tmpMCOO.constructor;
const f = $dotCall(tmpMCF, tmpMCOO, `constructor`, a, b, c, d);
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_constructor


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
