# Preval test case

# nested_after_use.md

> Normalize > Hoisting > Exported func named > Nested after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(g());
export function g() {
  $(f(1));
  function f() {
    return $(2);
  }
}
`````


## Settled


`````js filename=intro
const g /*:()=>undefined*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $(2);
  $(tmpReturnArg);
  return undefined;
};
g();
$(undefined);
export { g };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $($(2));
};
g();
$(undefined);
export { g };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 2 );
  $( b );
  return undefined;
};
a();
$( undefined );
export { a as g };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  let tmpCalleeParam = f(1);
  $(tmpCalleeParam);
  return undefined;
};
let tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
export { g };
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
