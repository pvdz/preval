# Preval test case

# global_after_use.md

> Normalize > Hoisting > Exported func default > Global after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(f(1));
export default function f() { return $(2); }
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $(2);
  return tmpReturnArg;
};
const tmpCalleeParam /*:unknown*/ = $(2);
$(tmpCalleeParam);
export { f as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
$($(2));
export { f as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 2 );
  return b;
};
const c = $( 2 );
$( c );
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
