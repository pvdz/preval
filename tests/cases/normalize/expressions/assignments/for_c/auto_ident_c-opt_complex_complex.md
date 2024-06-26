# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.[$("x")]);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)?.[$(`x`)];
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
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
      a = tmpChainElementObject;
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
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = undefined;
  const b = { x: 1 };
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed = $(`x`);
    tmpChainElementCall[tmpChainRootComputed];
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 = $(b);
      const tmpIfTest$4 = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$1 = $(`x`);
        tmpChainElementCall$1[tmpChainRootComputed$1];
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  a = undefined;
  const c = { x: 1 };
  const d = $( c );
  const e = d == null;
  if (e) {

  }
  else {
    const f = $( "x" );
    d[ f ];
  }
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( c );
      const i = h == null;
      if (i) {

      }
      else {
        const j = $( "x" );
        h[ j ];
      }
    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: 1
 - 5: { x: '1' }
 - 6: 'x'
 - 7: 1
 - 8: { x: '1' }
 - 9: 'x'
 - 10: 1
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 1
 - 14: { x: '1' }
 - 15: 'x'
 - 16: 1
 - 17: { x: '1' }
 - 18: 'x'
 - 19: 1
 - 20: { x: '1' }
 - 21: 'x'
 - 22: 1
 - 23: { x: '1' }
 - 24: 'x'
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
