# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b?.c(1)));
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
    tmpDoWhileFlag = a = b?.c(1);
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
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
      tmpNestedComplexRhs = tmpChainElementCall;
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
$(100);
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
let tmpClusterSSA_a = tmpChainElementCall;
let tmpClusterSSA_tmpDoWhileFlag = tmpChainElementCall;
let $tmpLoopUnrollCheck = true;
if (tmpChainElementCall) {
  $(100);
  const tmpChainElementObject$1 = b.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, b, 1);
  tmpClusterSSA_a = tmpChainElementCall$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpChainElementCall$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpChainElementObject$2 = b.c;
      const tmpChainElementCall$2 = $dotCall(tmpChainElementObject$2, b, 1);
      tmpClusterSSA_a = tmpChainElementCall$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpChainElementCall$2;
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
const a = { c: $ };
const b = $dotCall( $, a, 1 );
let c = b;
let d = b;
let e = true;
if (b) {
  $( 100 );
  const f = a.c;
  const g = $dotCall( f, a, 1 );
  c = g;
  d = g;
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const h = a.c;
      const i = $dotCall( h, a, 1 );
      c = i;
      d = i;
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
