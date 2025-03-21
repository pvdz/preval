# Preval test case

# func_method_no_this.md

> Object literal > Static prop lookups > Func method no this
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const f = function(){ $('piss'); $('pass'); $('poss'); };
const o = {f};
$(o.f());
`````


## Settled


`````js filename=intro
$(`piss`);
$(`pass`);
$(`poss`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`piss`);
$(`pass`);
$(`poss`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "piss" );
$( "pass" );
$( "poss" );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'piss'
 - 2: 'pass'
 - 3: 'poss'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
