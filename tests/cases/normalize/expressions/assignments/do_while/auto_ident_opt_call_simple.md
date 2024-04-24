# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $?.(1)));
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
    tmpDoWhileFlag = a = $?.(1);
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
    const tmpIfTest = tmpChainRootCall != null;
    if (tmpIfTest) {
      const tmpChainElementCall = tmpChainRootCall(1);
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
let tmpNestedComplexRhs = undefined;
let tmpSSA_a = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  tmpNestedComplexRhs = tmpChainElementCall;
  tmpSSA_a = tmpChainElementCall;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpIfTest$1 = $ == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 = $(1);
    tmpNestedComplexRhs$1 = tmpChainElementCall$1;
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpIfTest$2 = $ == null;
      if (tmpIfTest$2) {
      } else {
        const tmpChainElementCall$2 = $(1);
        tmpNestedComplexRhs$2 = tmpChainElementCall$2;
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
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
let e = a;
if (a) {
  $( 100 );
  let f = undefined;
  const g = $ == null;
  if (g) {

  }
  else {
    const h = $( 1 );
    f = h;
  }
  b = f;
  e = f;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      let i = undefined;
      const j = $ == null;
      if (j) {

      }
      else {
        const k = $( 1 );
        i = k;
      }
      b = i;
      e = i;
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
