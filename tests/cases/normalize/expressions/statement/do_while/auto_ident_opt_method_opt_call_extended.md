# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Do while > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b?.c.d.e?.(1));
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
    tmpDoWhileFlag = b?.c.d.e?.(1);
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
    tmpDoWhileFlag = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$3 = tmpChainElementObject$1.e;
      const tmpIfTest$1 = tmpChainElementObject$3 != null;
      if (tmpIfTest$1) {
        const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
        tmpDoWhileFlag = tmpChainElementCall;
      } else {
      }
    } else {
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const a = { a: 999, b: 1000 };
$(100);
let tmpDoWhileFlag = false;
const tmpIfTest$1 = $ == null;
let $tmpLoopUnrollCheck = false;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  tmpDoWhileFlag = tmpChainElementCall;
  $tmpLoopUnrollCheck = tmpChainElementCall;
}
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = false;
  const tmpChainElementObject$4 = tmpObjLitVal$1.e;
  const tmpIfTest$2 = tmpChainElementObject$4 == null;
  if (tmpIfTest$2) {
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$4, tmpObjLitVal$1, 1);
    tmpDoWhileFlag = tmpChainElementCall$1;
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = false;
      const tmpChainElementObject$1 = tmpObjLitVal$1.e;
      const tmpIfTest$3 = tmpChainElementObject$1 == null;
      if (tmpIfTest$3) {
      } else {
        const tmpChainElementCall$2 = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, 1);
        tmpDoWhileFlag = tmpChainElementCall$2;
      }
    } else {
      break;
    }
  }
} else {
}
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
$( 100 );
let c = false;
const d = $ == null;
let e = false;
if (d) {

}
else {
  const f = $dotCall( $, a, 1 );
  c = f;
  e = f;
}
if (c) {
  $( 100 );
  c = false;
  const g = a.e;
  const h = g == null;
  if (h) {

  }
  else {
    const i = $dotCall( g, a, 1 );
    c = i;
  }
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( 100 );
      c = false;
      const j = a.e;
      const k = j == null;
      if (k) {

      }
      else {
        const l = $dotCall( j, a, 1 );
        c = l;
      }
    }
    else {
      break;
    }
  }
}
$( b );
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
