# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Bindings > Export > Auto ident func anon
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = function () {};
$(a);
`````

## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = function () {
  debugger;
};
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as a };
$( a );
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
