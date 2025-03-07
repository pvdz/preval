# Preval test case

# import_shadows_arg.md

> Normalize > Naming > Import shadows arg
>
> The name of an arg that appears earlier in a file appeared to shadow the name of an exported global.

## Input

`````js filename=intro
export function g(x) {
  return x;
}
export const x = $(f());
`````

## Settled


`````js filename=intro
const g /*:(unknown)=>unknown*/ = function ($$0) {
  const x$1 /*:unknown*/ = $$0;
  debugger;
  return x$1;
};
const tmpCalleeParam /*:unknown*/ = f();
const x /*:unknown*/ = $(tmpCalleeParam);
export { x };
export { g };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function (x$1) {
  return x$1;
};
const x = $(f());
export { x };
export { g };
`````

## Pre Normal


`````js filename=intro
let g = function ($$0) {
  let x$1 = $$0;
  debugger;
  return x$1;
};
const x = $(f());
export { x };
export { g };
`````

## Normalized


`````js filename=intro
let g = function ($$0) {
  let x$1 = $$0;
  debugger;
  return x$1;
};
const tmpCalleeParam = f();
const x = $(tmpCalleeParam);
export { x };
export { g };
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  return b;
};
const c = f();
const d = $( c );
export { d as x };
export { a as g };
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
