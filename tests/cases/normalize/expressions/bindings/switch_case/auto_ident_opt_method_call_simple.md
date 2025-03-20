# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: $ };

    let a = b?.c(1);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = tmpClusterSSA_b.c(1);
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ c: $ }.c(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
