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

## Pre Normal


`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
};
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
