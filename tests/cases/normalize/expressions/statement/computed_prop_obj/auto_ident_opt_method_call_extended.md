# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
let obj = {};
(b?.c.d.e(1))["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
let obj = {};
(b?.c.d.e(1))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
  tmpCompObj = tmpChainElementCall;
} else {
}
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
tmpChainElementCall.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { e: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = $dotCall( $, a, 1 );
c.a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
