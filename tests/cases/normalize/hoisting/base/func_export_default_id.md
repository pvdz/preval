# Preval test case

# func_export_default_id.md

> Normalize > Hoisting > Base > Func export default id
>
> Exported func decls are still hoisted

## Input

`````js filename=intro
$(f);
export default function f(){}
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
export { f as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
$(f);
$(f);
export { f as default };
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
export { a as default };
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
export { f as default };
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
