# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b?.c.d.e?.(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = b?.c.d.e?.(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$3 = tmpChainElementObject$1.e;
      const tmpIfTest$1 = tmpChainElementObject$3 != null;
      if (tmpIfTest$1) {
        const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
        tmpNestedComplexRhs = tmpChainElementCall;
      } else {
      }
    } else {
    }
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
$(100);
let tmpNestedComplexRhs = undefined;
const tmpIfTest$1 = $ == null;
let tmpClusterSSA_a = undefined;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  tmpNestedComplexRhs = tmpChainElementCall;
  tmpClusterSSA_a = tmpChainElementCall;
}
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainElementObject$4 = tmpObjLitVal$1.e;
  const tmpIfTest$2 = tmpChainElementObject$4 == null;
  if (tmpIfTest$2) {
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$4, tmpObjLitVal$1, 1);
    tmpNestedComplexRhs$1 = tmpChainElementCall$1;
  }
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpChainElementObject$1 = tmpObjLitVal$1.e;
      const tmpIfTest$3 = tmpChainElementObject$1 == null;
      if (tmpIfTest$3) {
      } else {
        const tmpChainElementCall$2 = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, 1);
        tmpNestedComplexRhs$2 = tmpChainElementCall$2;
      }
      tmpClusterSSA_a = tmpNestedComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { e: $ };
$( 100 );
let b = undefined;
const c = $ == null;
let d = undefined;
if (c) {

}
else {
  const e = $dotCall( $, a, 1 );
  b = e;
  d = e;
}
let f = b;
let g = true;
if (f) {
  $( 100 );
  let h = undefined;
  const i = a.e;
  const j = i == null;
  if (j) {

  }
  else {
    const k = $dotCall( i, a, 1 );
    h = k;
  }
  d = h;
  f = h;
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      let l = undefined;
      const m = a.e;
      const n = m == null;
      if (n) {

      }
      else {
        const o = $dotCall( m, a, 1 );
        l = o;
      }
      d = l;
      f = l;
    }
    else {
      break;
    }
  }
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
