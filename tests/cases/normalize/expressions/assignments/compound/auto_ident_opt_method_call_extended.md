# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e(1)));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$3.call(tmpChainElementObject$1, 1);
  tmpBinBothRhs = tmpChainElementCall;
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let tmpBinBothRhs = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$3.call(tmpChainElementObject$1, 1);
  tmpBinBothRhs = tmpChainElementCall;
}
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
