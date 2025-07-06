# Preval test case

# base_func_name.md

> Normalize > Export > Default > Base func name
>
> Exporting a function

## Input

`````js filename=intro
export default function f() {}
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
export { f as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function $pcompiled() {};
export { f as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
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
