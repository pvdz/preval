# Preval test case

# base_func.md

> Normalize > Export > Named > Base func
>
> Exporting declarations

## Input

`````js filename=intro
export function f() {};
f();
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
export { f };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function $pcompiled() {};
export { f };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
export { a as f };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
f();
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
