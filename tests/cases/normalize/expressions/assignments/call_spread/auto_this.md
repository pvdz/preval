# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Call spread > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = this));
$(a);
`````


## Settled


`````js filename=intro
$(...undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
