# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary excl simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = !arg;
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
$(false, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false, 1 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
