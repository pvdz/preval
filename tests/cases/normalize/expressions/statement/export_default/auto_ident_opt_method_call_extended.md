# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Export default > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
export default b?.c.d.e(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = b?.c.d.e(1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
  tmpAnonDefaultExport = tmpChainElementCall;
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { e: $ };
const b = {
a: 999,
b: 1000
;
let c = undefined;
const d = $dotCall( $, a, 1 );
c = d;
export { c as default from "undefined"
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
