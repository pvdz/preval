# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Bindings > Export > Auto ident opt method call extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

export let a = b?.c.d.e(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = b?.c.d.e(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementCall = tmpChainElementObject$1.e(1);
  a = tmpChainElementCall;
} else {
}
export { a };
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = tmpObjLitVal$1.e(1);
a = tmpChainElementCall;
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { e: $ };
const c = b.e( 1 );
a = c;
export { a as a };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
