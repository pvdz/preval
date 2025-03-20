# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary tilde complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = ~$(100);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = ~tmpUnaryArg;
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
$(~tmpUnaryArg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
$( b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: -101
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
