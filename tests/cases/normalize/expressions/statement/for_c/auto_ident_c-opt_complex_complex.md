# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)?.[$("x")]);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)?.[$(`x`)];
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $(`x`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    } else {
    }
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const b = { x: 1 };
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed = $(`x`);
    tmpChainElementCall[tmpChainRootComputed];
  }
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpChainElementCall$1 = $(b);
      const tmpIfTest$2 = tmpChainElementCall$1 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpChainRootComputed$1 = $(`x`);
        tmpChainElementCall$1[tmpChainRootComputed$1];
      }
      tmpClusterSSA_tmpIfTest = $(1);
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
const a = $( 1 );
if (a) {
  const b = { x: 1 };
  const c = $( b );
  const d = c == null;
  if (d) {

  }
  else {
    const e = $( "x" );
    c[ e ];
  }
  let f = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (f) {
      const g = $( b );
      const h = g == null;
      if (h) {

      }
      else {
        const i = $( "x" );
        g[ i ];
      }
      f = $( 1 );
    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
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
