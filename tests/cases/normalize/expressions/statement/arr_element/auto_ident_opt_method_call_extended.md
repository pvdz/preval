# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt method call extended
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
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
  tmpBinBothLhs = tmpChainElementCall;
}
let tmpBinBothRhs = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$3 = tmpChainRootProp$1.c;
  const tmpChainElementObject$4 = tmpChainElementObject$3.d;
  const tmpChainElementObject$5 = tmpChainElementObject$4.e;
  const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
  tmpBinBothRhs = tmpChainElementCall$1;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
  tmpBinBothLhs = tmpChainElementCall;
}
let tmpBinBothRhs = undefined;
const tmpIfTest$1 = b != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$3 = b.c;
  const tmpChainElementObject$4 = tmpChainElementObject$3.d;
  const tmpChainElementObject$5 = tmpChainElementObject$4.e;
  const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
  tmpBinBothRhs = tmpChainElementCall$1;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
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
