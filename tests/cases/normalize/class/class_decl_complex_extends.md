# Preval test case

# class_decl_complex_extends.md

> Normalize > Class > Class decl complex extends
>
> Extends should be a simple node

## Input

`````js filename=intro
class x extends $(String) {}
$(x);
`````


## Settled


`````js filename=intro
const tmpClassSuper /*:unknown*/ = $(String);
const x /*:class*/ = class extends tmpClassSuper {};
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClassSuper = $(String);
$(class extends tmpClassSuper {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( String );
const b = class   {

};
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
