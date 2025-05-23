# Preval test case

# base_func_anon.md

> Normalize > Export > Default > Base func anon
>
> Exporting a function

## Input

`````js filename=intro
export default function() {}
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = function () {};
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
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
