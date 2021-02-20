# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt method opt call extended
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
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$2 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$2 = tmpChainRootProp$1 != null;
if (tmpIfTest$2) {
  const tmpChainElementObject$3 = tmpChainRootProp$1.c;
  const tmpChainElementObject$4 = tmpChainElementObject$3.d;
  const tmpChainElementObject$5 = tmpChainElementObject$4.e;
  const tmpIfTest$3 = tmpChainElementObject$5 != null;
  if (tmpIfTest$3) {
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
const b = { c: tmpObjLitVal };
let SSA_a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$2 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    SSA_a = tmpChainElementCall;
  }
}
const tmpBinBothLhs = SSA_a;
let SSA_a$1 = undefined;
const tmpIfTest$2 = b != null;
if (tmpIfTest$2) {
  const tmpChainElementObject$3 = b.c;
  const tmpChainElementObject$4 = tmpChainElementObject$3.d;
  const tmpChainElementObject$5 = tmpChainElementObject$4.e;
  const tmpIfTest$3 = tmpChainElementObject$5 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
    SSA_a$1 = tmpChainElementCall$1;
  }
}
const tmpBinBothRhs = SSA_a$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
