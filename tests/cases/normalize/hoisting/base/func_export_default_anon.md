# Preval test case

# func_export_default_anon.md

> Normalize > Hoisting > Base > Func export default anon
>
> This should not be hoisted because you can't refer to it anyways

## Input

`````js filename=intro
$(f);
export default function(){}
$(f);
`````


## Settled


`````js filename=intro
$(f);
const tmpAnonDefaultExport /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(f);
const tmpAnonDefaultExport = function () {};
export { tmpAnonDefaultExport as default };
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
$( f );
const a = function() {
  debugger;
  return undefined;
};
export { a as default };
$( f );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

f


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
