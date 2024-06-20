# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.[$("x")]?.[$("y")]);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)?.[$(`x`)]?.[$(`y`)];
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $(`x`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      const tmpIfTest$3 = tmpChainElementObject != null;
      if (tmpIfTest$3) {
        const tmpChainRootComputed$1 = $(`y`);
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        a = tmpChainElementObject$1;
      } else {
      }
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
const tmpObjLitVal = { y: 1 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const b = { x: tmpObjLitVal };
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject == null;
    if (tmpIfTest$3) {
    } else {
      const tmpChainRootComputed$1 = $(`y`);
      tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 = $(b);
      const tmpIfTest$4 = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$2 = $(`x`);
        const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
        const tmpIfTest$6 = tmpChainElementObject$2 == null;
        if (tmpIfTest$6) {
        } else {
          const tmpChainRootComputed$4 = $(`y`);
          tmpChainElementObject$2[tmpChainRootComputed$4];
        }
      }
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( 1 );
if (b) {
  const c = { x: a };
  const d = $( c );
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
      g[ i ];
    }
  }
  while ($LOOP_UNROLL_10) {
    const j = $( 1 );
    if (j) {
      const k = $( c );
      const l = k == null;
      if (l) {

      }
      else {
        const m = $( "x" );
        const n = k[ m ];
        const o = n == null;
        if (o) {

        }
        else {
          const p = $( "y" );
          n[ p ];
        }
      }
    }
    else {
      break;
    }
  }
}
const q = {
  a: 999,
  b: 1000,
};
$( q );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: 1
 - 6: { x: '{"y":"1"}' }
 - 7: 'x'
 - 8: 'y'
 - 9: 1
 - 10: { x: '{"y":"1"}' }
 - 11: 'x'
 - 12: 'y'
 - 13: 1
 - 14: { x: '{"y":"1"}' }
 - 15: 'x'
 - 16: 'y'
 - 17: 1
 - 18: { x: '{"y":"1"}' }
 - 19: 'x'
 - 20: 'y'
 - 21: 1
 - 22: { x: '{"y":"1"}' }
 - 23: 'x'
 - 24: 'y'
 - 25: 1
 - 26: { x: '{"y":"1"}' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
