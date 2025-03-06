# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; $(b)?.[$("x")]?.[$("y")]; $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  while ($(b)?.[$(`x`)]?.[$(`y`)]) {
    $(1);
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
  let tmpIfTest = undefined;
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
      tmpIfTest = tmpChainElementObject$1;
    } else {
    }
  } else {
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    tmpIfTest = tmpChainElementObject$1;
  }
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpChainElementCall$1 /*:unknown*/ = $(b);
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainRootComputed$2 /*:unknown*/ = $(`x`);
      const tmpChainElementObject$2 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$2];
      const tmpIfTest$6 /*:boolean*/ = tmpChainElementObject$2 == null;
      if (tmpIfTest$6) {
      } else {
        const tmpChainRootComputed$4 /*:unknown*/ = $(`y`);
        const tmpChainElementObject$4 /*:unknown*/ = tmpChainElementObject$2[tmpChainRootComputed$4];
        tmpIfTest$2 = tmpChainElementObject$4;
      }
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { y: 1 };
const c = { x: b };
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
    const j = g[ i ];
    a = j;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    let k = undefined;
    const l = $( c );
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
        k = r;
      }
    }
    if (k) {

    }
    else {
      break;
    }
  }
}
const s = {
  a: 999,
  b: 1000,
};
$( s );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: { x: '{"y":"1"}' }
 - 6: 'x'
 - 7: 'y'
 - 8: 1
 - 9: { x: '{"y":"1"}' }
 - 10: 'x'
 - 11: 'y'
 - 12: 1
 - 13: { x: '{"y":"1"}' }
 - 14: 'x'
 - 15: 'y'
 - 16: 1
 - 17: { x: '{"y":"1"}' }
 - 18: 'x'
 - 19: 'y'
 - 20: 1
 - 21: { x: '{"y":"1"}' }
 - 22: 'x'
 - 23: 'y'
 - 24: 1
 - 25: { x: '{"y":"1"}' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check