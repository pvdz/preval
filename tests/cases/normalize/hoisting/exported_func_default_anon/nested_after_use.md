# Preval test case

# nested_after_use.md

> Normalize > Hoisting > Exported func default anon > Nested after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

Exported functions must still hoist their own body

## Input

`````js filename=intro
$(1);
export default function() {
  $(f(1));
  function f() {
    return $(2);
  }
}
`````


## Settled


`````js filename=intro
$(1);
const tmpAnonDefaultExport /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = $(2);
  $(tmpCalleeParam);
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  $($(2));
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
  $( b );
  return undefined;
};
export { a as default };
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
