# Preval test case

# global_after_use.md

> Normalize > Hoisting > Exported func default anon > Global after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(1);
export default function() { return $(2); }
`````


## Settled


`````js filename=intro
$(1);
const tmpAnonDefaultExport /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $(2);
  return tmpReturnArg;
};
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = function() {
  debugger;
  const b = $( 2 );
  return b;
};
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  const tmpReturnArg = $(2);
  return tmpReturnArg;
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
