# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)?.(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $($)?.(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest = tmpChainElementCall != null;
    if (tmpIfTest) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
      tmpNestedComplexRhs = tmpChainElementCall$1;
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
let tmpNestedComplexRhs = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpSSA_a = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  tmpNestedComplexRhs = tmpChainElementCall$1;
  tmpSSA_a = tmpChainElementCall$1;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainElementCall$2 = $($);
  const tmpIfTest$1 = tmpChainElementCall$2 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, 1);
    tmpNestedComplexRhs$1 = tmpChainElementCall$4;
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpChainElementCall$3 = $($);
      const tmpIfTest$2 = tmpChainElementCall$3 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, 1);
        tmpNestedComplexRhs$2 = tmpChainElementCall$5;
      }
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = $dotCall( b, $, 1 );
  a = e;
  d = e;
}
let f = a;
if (a) {
  $( 100 );
  let g = undefined;
  const h = $( $ );
  const i = h == null;
  if (i) {

  }
  else {
    const j = $dotCall( h, $, 1 );
    g = j;
  }
  d = g;
  f = g;
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      let k = undefined;
      const l = $( $ );
      const m = l == null;
      if (m) {

      }
      else {
        const n = $dotCall( l, $, 1 );
        k = n;
      }
      d = k;
      f = k;
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
 - 2: '<$>'
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 100
 - 8: '<$>'
 - 9: 1
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 100
 - 20: '<$>'
 - 21: 1
 - 22: 100
 - 23: '<$>'
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
