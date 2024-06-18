# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > While > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
while (b?.c.d.e?.(1)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
while (b?.c.d.e?.(1)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
      tmpIfTest = tmpChainElementCall;
    } else {
    }
  } else {
  }
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
const a = { a: 999, b: 1000 };
let tmpIfTest = false;
const tmpIfTest$3 = $ == null;
if (tmpIfTest$3) {
} else {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  $(100);
  while ($LOOP_UNROLL_10) {
    let tmpIfTest$1 = false;
    const tmpChainElementObject$6 = tmpObjLitVal$1.e;
    const tmpIfTest$4 = tmpChainElementObject$6 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$6, tmpObjLitVal$1, 1);
      tmpIfTest$1 = tmpChainElementCall$1;
    }
    if (tmpIfTest$1) {
      $(100);
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
  b: 1000,
};
let c = false;
const d = $ == null;
if (d) {

}
else {
  const e = $dotCall( $, a, 1 );
  c = e;
}
if (c) {
  $( 100 );
  while ($LOOP_UNROLL_10) {
    let f = false;
    const g = a.e;
    const h = g == null;
    if (h) {

    }
    else {
      const i = $dotCall( g, a, 1 );
      f = i;
    }
    if (f) {
      $( 100 );
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
