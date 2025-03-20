# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = typeof $(x);
    $(a, x);
}
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:string*/ = typeof tmpUnaryArg;
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(typeof tmpUnaryArg, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
