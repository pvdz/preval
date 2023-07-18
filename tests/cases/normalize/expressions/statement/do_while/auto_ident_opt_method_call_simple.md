# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b?.c(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = b?.c(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
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
      const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
      tmpDoWhileFlag = tmpChainElementCall;
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
const b = { c: $ };
const a = { a: 999, b: 1000 };
$(100);
const tmpChainElementCall = $dotCall($, b, 1);
if (tmpChainElementCall) {
  $(100);
  const tmpChainElementObject$1 = b.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, b, 1);
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpChainElementCall$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpChainElementObject$2 = b.c;
      const tmpChainElementCall$2 = $dotCall(tmpChainElementObject$2, b, 1);
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpChainElementCall$2;
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
const a = { c: $ };
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $dotCall( $, a, 1 );
if (c) {
  $( 100 );
  const d = a.c;
  const e = $dotCall( d, a, 1 );
  let f = e;
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      const g = a.c;
      const h = $dotCall( g, a, 1 );
      f = h;
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
