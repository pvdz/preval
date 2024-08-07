# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > While > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

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
let a = undefined;
const tmpObjLitVal$1 = { e: $ };
const tmpIfTest$3 = $ == null;
if (tmpIfTest$3) {
} else {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  a = tmpChainElementCall;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 = tmpObjLitVal$1.e;
    const tmpIfTest$1 = tmpChainElementObject$1 == null;
    if (tmpIfTest$1) {
    } else {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, 1);
      a = tmpChainElementCall$1;
    }
    if (a) {
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
let a = undefined;
const b = { e: $ };
const c = $ == null;
if (c) {

}
else {
  const d = $dotCall( $, b, 1 );
  a = d;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = b.e;
    const f = e == null;
    if (f) {

    }
    else {
      const g = $dotCall( e, b, 1 );
      a = g;
    }
    if (a) {

    }
    else {
      break;
    }
  }
}
$( a );
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
