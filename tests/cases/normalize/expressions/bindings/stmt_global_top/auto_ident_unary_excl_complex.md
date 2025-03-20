# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident unary excl complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = !$(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:boolean*/ = !tmpUnaryArg;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
$(!tmpUnaryArg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
