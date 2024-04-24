# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(b)?.[$("x")]?.[$("y")]);
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
    tmpDoWhileFlag = $(b)?.[$(`x`)]?.[$(`y`)];
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
    tmpDoWhileFlag = undefined;
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
        tmpDoWhileFlag = tmpChainElementObject$1;
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
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
$(100);
let tmpDoWhileFlag = false;
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
    tmpDoWhileFlag = tmpChainElementObject$1;
  }
}
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = false;
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
      tmpDoWhileFlag = tmpChainElementObject$4;
    }
  }
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = false;
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
          tmpDoWhileFlag = tmpChainElementObject$5;
        }
      }
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
const a = { y: 1 };
const b = { x: a };
const c = {
a: 999,
b: 1000
;
$( 100 );
let d = false;
const e = $( b );
const f = e == null;
if (f) {

}
else {
  const g = $( "x" );
  const h = e[ g ];
  const i = h == null;
  if (i) {

  }
  else {
    const j = $( "y" );
    const k = h[ j ];
    d = k;
  }
}
if (d) {
  $( 100 );
  d = false;
  const l = $( b );
  const m = l == null;
  if (m) {

  }
  else {
    const n = $( "x" );
    const o = l[ n ];
    const p = o == null;
    if (p) {

    }
    else {
      const q = $( "y" );
      const r = o[ q ];
      d = r;
    }
  }
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      d = false;
      const s = $( b );
      const t = s == null;
      if (t) {

      }
      else {
        const u = $( "x" );
        const v = s[ u ];
        const w = v == null;
        if (w) {

        }
        else {
          const x = $( "y" );
          const y = v[ x ];
          d = y;
        }
      }
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
