# Preval test case

# nested_after_use.md

> Normalize > Hoisting > Exported func default > Nested after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(g());
export default function g() {
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
  const tmpCalleeParam /*:unknown*/ = $(2);
  $(tmpCalleeParam);
  return undefined;
};
g();
$(undefined);
export { g as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $($(2));
};
g();
$(undefined);
export { g as default };
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
