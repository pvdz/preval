# Preval test case

# simple_func_into_var_decl.md

> Function inlining > Simple func into var decl
>
> Attempt to create a case where a simple function is folded while the call is into a var decl.

## Input

`````js filename=intro
let a = 10;
function f() {
  a = 20;
}
const p = f();
const q = f();
$(p, q);
`````


## Settled


`````js filename=intro
$(undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  a = 20;
  return undefined;
};
let a = 10;
const p = f();
const q = f();
$(p, q);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
