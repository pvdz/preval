# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)?.[$("x")]));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $(b)?.[$(`x`)];
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest = tmpChainElementCall != null;
    if (tmpIfTest) {
      const tmpChainRootComputed = $(`x`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      tmpNestedComplexRhs = tmpChainElementObject;
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
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpSSA_a = undefined;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpNestedComplexRhs = tmpChainElementObject;
  tmpSSA_a = tmpChainElementObject;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$1 = tmpChainElementCall$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 = $(`x`);
    const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
    tmpNestedComplexRhs$1 = tmpChainElementObject$1;
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpChainElementCall$2 = $(b);
      const tmpIfTest$2 = tmpChainElementCall$2 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpChainRootComputed$2 = $(`x`);
        const tmpChainElementObject$2 = tmpChainElementCall$2[tmpChainRootComputed$2];
        tmpNestedComplexRhs$2 = tmpChainElementObject$2;
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
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {

}
else {
  const f = $( "x" );
  const g = c[ f ];
  a = g;
  e = g;
}
let h = a;
if (a) {
  $( 100 );
  let i = undefined;
  const j = $( b );
  const k = j == null;
  if (k) {

  }
  else {
    const l = $( "x" );
    const m = j[ l ];
    i = m;
  }
  e = i;
  h = i;
  while ($LOOP_UNROLL_9) {
    if (h) {
      $( 100 );
      let n = undefined;
      const o = $( b );
      const p = o == null;
      if (p) {

      }
      else {
        const q = $( "x" );
        const r = o[ q ];
        n = r;
      }
      e = n;
      h = n;
    }
    else {
      break;
    }
  }
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: 100
 - 5: { x: '1' }
 - 6: 'x'
 - 7: 100
 - 8: { x: '1' }
 - 9: 'x'
 - 10: 100
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 100
 - 14: { x: '1' }
 - 15: 'x'
 - 16: 100
 - 17: { x: '1' }
 - 18: 'x'
 - 19: 100
 - 20: { x: '1' }
 - 21: 'x'
 - 22: 100
 - 23: { x: '1' }
 - 24: 'x'
 - 25: 100
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
