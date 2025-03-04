# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b?.c.d.e(1)));
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
  if ((a = b?.c.d.e(1))) {
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
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementCall = tmpChainElementObject$1.e(1);
    a = tmpChainElementCall;
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
$(100);
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
let tmpClusterSSA_a /*:unknown*/ = tmpChainElementCall;
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = tmpObjLitVal$1.e(1);
    tmpClusterSSA_a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
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
$( 100 );
const a = { e: $ };
const b = a.e( 1 );
let c = b;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = a.e( 1 );
    c = d;
    if (d) {

    }
    else {
      break;
    }
  }
}
$( c );
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
