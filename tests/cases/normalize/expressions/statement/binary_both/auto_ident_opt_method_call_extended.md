# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Binary both > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e(1) + b?.c.d.e(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
b?.c.d.e(1) + b?.c.d.e(1);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
  tmpBinBothLhs = tmpChainElementCall;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$5 = tmpChainRootProp$1.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, 1);
  tmpBinBothRhs = tmpChainElementCall$1;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
const tmpChainElementObject$9 = tmpObjLitVal$1.e;
const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, 1);
tmpChainElementCall + tmpChainElementCall$1;
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
const c = $dotCall( $, a, 1 );
const d = a.e;
const e = $dotCall( d, a, 1 );
c + e;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
