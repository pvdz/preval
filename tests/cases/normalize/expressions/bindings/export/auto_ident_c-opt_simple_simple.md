# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident c-opt simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

export let a = b?.["x"];
$(a);
`````

## Settled


`````js filename=intro
const a /*:number*/ = 1;
export { a };
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 1;
export { a };
$(1);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = b?.[`x`];
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1;
export { a as a };
$( 1 );
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
