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

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { x: 1 };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`x`);
    tmpChainElementCall[tmpChainRootComputed];
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 /*:unknown*/ = $(b);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
        tmpChainElementCall$1[tmpChainRootComputed$1];
      }
    } else {
      break;
    }
  }
  $(undefined);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const b = { x: 1 };
  const tmpChainElementCall = $(b);
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`x`);
    tmpChainElementCall[tmpChainRootComputed];
  }
  while (true) {
    if ($(1)) {
      const tmpChainElementCall$1 = $(b);
      if (!(tmpChainElementCall$1 == null)) {
        const tmpChainRootComputed$1 = $(`x`);
        tmpChainElementCall$1[tmpChainRootComputed$1];
      }
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $({ a: 999, b: 1000 });
}
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
    const tmpChainElementCall = $(b);
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

## PST Settled
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
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( b );
      const h = g == null;
      if (h) {

      }
      else {
        const i = $( "x" );
        g[ i ];
      }
    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  const j = {
    a: 999,
    b: 1000,
  };
  $( j );
}
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check