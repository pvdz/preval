# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> normalize > expressions > assignments > binary_both > auto_ident_opt_method_opt_call_extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) + (a = b?.c.d.e?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  if (tmpChainElementObject$2) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainElementObject$3 = tmpChainRootProp$1.c;
  const tmpChainElementObject$4 = tmpChainElementObject$3.d;
  const tmpChainElementObject$5 = tmpChainElementObject$4.e;
  if (tmpChainElementObject$5) {
    const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
    a = tmpChainElementCall$1;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  if (tmpChainElementObject$2) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainElementObject$3 = tmpChainRootProp$1.c;
  const tmpChainElementObject$4 = tmpChainElementObject$3.d;
  const tmpChainElementObject$5 = tmpChainElementObject$4.e;
  if (tmpChainElementObject$5) {
    const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
    a = tmpChainElementCall$1;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same