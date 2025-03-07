# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident opt simple opt simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

export let a = b?.x?.y;
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
let b = { x: { y: 1 } };
let a = b?.x?.y;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  } else {
  }
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
