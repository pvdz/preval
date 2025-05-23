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
const tmpClassSuper /*:unknown*/ = $($string_constructor);
const x /*:class*/ = class extends tmpClassSuper {};
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClassSuper = $($string_constructor);
$(class extends tmpClassSuper {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $string_constructor );
const b = class   {

};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpClassSuper = $($string_constructor);
let x = class extends tmpClassSuper {};
$(x);
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
