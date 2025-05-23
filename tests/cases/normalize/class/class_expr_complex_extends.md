# Preval test case

# class_expr_complex_extends.md

> Normalize > Class > Class expr complex extends
>
> Extends should be a simple node

## Input

`````js filename=intro
let a = class x extends $(String) {}
$(a, x);
`````


## Settled


`````js filename=intro
const tmpClassSuper /*:unknown*/ = $($string_constructor);
const a /*:class*/ = class x extends tmpClassSuper {};
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClassSuper = $($string_constructor);
$(class x extends tmpClassSuper {}, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $string_constructor );
const b = class x  {

};
$( b, x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpClassSuper = $($string_constructor);
let a = class x extends tmpClassSuper {};
$(a, x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
