# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary void simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = 1;

    let a = void arg;
    $(a, arg);
}
`````


## Settled


`````js filename=intro
$(undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
