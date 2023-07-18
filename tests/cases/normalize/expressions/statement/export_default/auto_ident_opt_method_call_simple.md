# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
export default b?.c(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = b?.c(1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  tmpAnonDefaultExport = tmpChainElementCall;
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
let tmpAnonDefaultExport = undefined;
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { c: $ };
const c = $dotCall( $, b, 1 );
a = c;
export { a as default from "undefined"
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
