# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.x);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)?.x;
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
      const tmpChainElementObject = tmpChainElementCall.x;
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
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = undefined;
  const b /*:object*/ = { x: 1 };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    tmpChainElementCall.x;
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 /*:unknown*/ = $(b);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        tmpChainElementCall$1.x;
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
    d.x;
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( c );
      const h = g == null;
      if (h) {

      }
      else {
        g.x;
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
 - 3: 1
 - 4: { x: '1' }
 - 5: 1
 - 6: { x: '1' }
 - 7: 1
 - 8: { x: '1' }
 - 9: 1
 - 10: { x: '1' }
 - 11: 1
 - 12: { x: '1' }
 - 13: 1
 - 14: { x: '1' }
 - 15: 1
 - 16: { x: '1' }
 - 17: 1
 - 18: { x: '1' }
 - 19: 1
 - 20: { x: '1' }
 - 21: 1
 - 22: { x: '1' }
 - 23: 1
 - 24: { x: '1' }
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
