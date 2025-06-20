# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident cond simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 1 ? 2 : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
$(...2);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...2);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...2 );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 2;
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
