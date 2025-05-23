# Preval test case

# func_export_named.md

> Normalize > Hoisting > Base > Func export named
>
> Exported func decls are still hoisted

## Input

`````js filename=intro
$(f);
export function f(){}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f);
$(f);
export { f };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
$(f);
$(f);
export { f };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( a );
export { a as f };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
$(f);
$(f);
export { f };
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
