# Preval test case

# func_decl_func_decl.md

> Normalize > Hoisting > Func decl func decl
>
> Function declaration in toplevel

## Input

`````js filename=intro
function g() {
  $(1);
  function f() {}
  $(f());
}
g();
`````


## Settled


`````js filename=intro
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
