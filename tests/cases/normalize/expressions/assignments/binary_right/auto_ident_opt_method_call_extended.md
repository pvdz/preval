# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$($(100) + (a = b?.c.d.e(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$($(100) + (a = b?.c.d.e(1)));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$3.call(tmpChainElementObject$1, 1);
  a = tmpChainElementCall;
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
const b = { c: tmpObjLitVal };
const tmpBinBothLhs = $(100);
let SSA_a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$3.call(tmpChainElementObject$1, 1);
  SSA_a = tmpChainElementCall;
}
const tmpBinBothRhs = SSA_a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 101
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
