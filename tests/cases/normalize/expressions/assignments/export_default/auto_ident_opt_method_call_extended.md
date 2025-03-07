# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
export default a = b?.c.d.e(1);
$(a);
`````

## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(tmpChainElementCall);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = undefined;
const tmpChainElementCall = { e: $ }.e(1);
tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(tmpChainElementCall);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b?.c.d.e(1));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementCall = tmpChainElementObject$1.e(1);
  a = tmpChainElementCall;
} else {
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { e: $ };
const c = b.e( 1 );
a = c;
export { a as default };
$( c );
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
