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
while (true) {
  {
    $(100);
  }
  if (b?.c.d.e?.(1)) {
  } else {
    break;
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
while (true) {
  $(100);
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
let $tmpLoopUnrollCheck = true;
$(100);
let tmpIfTest = false;
const tmpIfTest$3 = $ == null;
if (tmpIfTest$3) {
} else {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$1 = false;
    const tmpChainElementObject$6 = tmpObjLitVal$1.e;
    const tmpIfTest$4 = tmpChainElementObject$6 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$6, tmpObjLitVal$1, 1);
      tmpIfTest$1 = tmpChainElementCall$1;
    }
    if (tmpIfTest$1) {
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
let c = true;
$( 100 );
let d = false;
const e = $ == null;
if (e) {

}
else {
  const f = $dotCall( $, a, 1 );
  d = f;
}
if (d) {

}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let g = false;
    const h = a.e;
    const i = h == null;
    if (i) {

    }
    else {
      const j = $dotCall( h, a, 1 );
      g = j;
    }
    if (g) {

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
