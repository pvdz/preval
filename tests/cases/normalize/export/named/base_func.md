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
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { f };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
export { f };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as f };
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
