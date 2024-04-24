# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $(b)?.[$(`x`)]?.[$(`y`)];
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
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
      const tmpIfTest$1 = tmpChainElementObject != null;
      if (tmpIfTest$1) {
        const tmpChainRootComputed$1 = $(`y`);
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        tmpNestedComplexRhs = tmpChainElementObject$1;
      } else {
      }
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
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
$(100);
let tmpNestedComplexRhs = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
}
let tmpSSA_a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$2 = tmpChainElementCall$1 == null;
  if (tmpIfTest$2) {
  } else {
    const tmpChainRootComputed$2 = $(`x`);
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    const tmpIfTest$4 = tmpChainElementObject$2 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainRootComputed$4 = $(`y`);
      const tmpChainElementObject$4 = tmpChainElementObject$2[tmpChainRootComputed$4];
      tmpNestedComplexRhs$1 = tmpChainElementObject$4;
    }
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_a) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpChainElementCall$2 = $(b);
      const tmpIfTest$3 = tmpChainElementCall$2 == null;
      if (tmpIfTest$3) {
      } else {
        const tmpChainRootComputed$3 = $(`x`);
        const tmpChainElementObject$3 = tmpChainElementCall$2[tmpChainRootComputed$3];
        const tmpIfTest$5 = tmpChainElementObject$3 == null;
        if (tmpIfTest$5) {
        } else {
          const tmpChainRootComputed$5 = $(`y`);
          const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
          tmpNestedComplexRhs$2 = tmpChainElementObject$5;
        }
      }
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_a = tmpNestedComplexRhs$2;
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
const a = { y: 1 };
const b = { x: a };
$( 100 );
let c = undefined;
const d = $( b );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "y" );
    const j = g[ i ];
    c = j;
  }
}
let k = c;
if (c) {
  $( 100 );
  let l = undefined;
  const m = $( b );
  const n = m == null;
  if (n) {

  }
  else {
    const o = $( "x" );
    const p = m[ o ];
    const q = p == null;
    if (q) {

    }
    else {
      const r = $( "y" );
      const s = p[ r ];
      l = s;
    }
  }
  k = l;
  while ($LOOP_UNROLL_9) {
    if (k) {
      $( 100 );
      let t = undefined;
      const u = $( b );
      const v = u == null;
      if (v) {

      }
      else {
        const w = $( "x" );
        const x = u[ w ];
        const y = x == null;
        if (y) {

        }
        else {
          const z = $( "y" );
          const 01 = x[ z ];
          t = 01;
        }
      }
      k = t;
      k = t;
    }
    else {
      break;
    }
  }
}
$( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: 100
 - 6: { x: '{"y":"1"}' }
 - 7: 'x'
 - 8: 'y'
 - 9: 100
 - 10: { x: '{"y":"1"}' }
 - 11: 'x'
 - 12: 'y'
 - 13: 100
 - 14: { x: '{"y":"1"}' }
 - 15: 'x'
 - 16: 'y'
 - 17: 100
 - 18: { x: '{"y":"1"}' }
 - 19: 'x'
 - 20: 'y'
 - 21: 100
 - 22: { x: '{"y":"1"}' }
 - 23: 'x'
 - 24: 'y'
 - 25: 100
 - 26: { x: '{"y":"1"}' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
