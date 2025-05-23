# Preval test case

# class_expr_anon.md

> Normalize > Class > Class expr anon
>
> Class expression base

## Input

`````js filename=intro
let a = class {}
$(a);
`````


## Settled


`````js filename=intro
const a /*:class*/ = class {};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(class {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = class {};
$(a);
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
