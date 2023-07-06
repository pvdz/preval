# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > While > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
while ((a = b?.c.d.e?.(1))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
while ((a = b?.c.d.e?.(1))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    } else {
    }
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let a = undefined;
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
const tmpChainElementObject$1 = tmpObjLitVal.d;
const tmpChainElementObject$3 = tmpChainElementObject$1.e;
const tmpIfTest$3 = tmpChainElementObject$3 == null;
if (tmpIfTest$3) {
  $(100);
} else {
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
  a = tmpChainElementCall;
  if (tmpChainElementCall) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
while ($tmpLoopUnrollCheck) {
  a = undefined;
  const tmpChainElementObject$2 = b.c;
  const tmpChainElementObject$4 = tmpChainElementObject$2.d;
  const tmpChainElementObject$6 = tmpChainElementObject$4.e;
  const tmpIfTest$1 = tmpChainElementObject$6 == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$6, tmpChainElementObject$4, 1);
    a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
      $(100);
    } else {
      break;
    }
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
