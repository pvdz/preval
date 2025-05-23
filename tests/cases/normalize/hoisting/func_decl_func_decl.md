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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return undefined;
  };
  $(1);
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
  return undefined;
};
g();
`````


## Todos triggered


None


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
