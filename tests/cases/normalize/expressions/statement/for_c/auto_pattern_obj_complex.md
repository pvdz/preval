# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For c > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (; $(1); $({ a: 1, b: 2 }));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  $(tmpCalleeParam);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
      $(tmpCalleeParam$1);
    } else {
      break;
    }
  }
  $(999);
} else {
  $(999);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $({ a: 1, b: 2 });
  while (true) {
    if ($(1)) {
      $({ a: 1, b: 2 });
    } else {
      break;
    }
  }
  $(999);
} else {
  $(999);
}
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
{
  while ($(1)) {
    $({ a: 1, b: 2 });
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 1, b: 2 };
    $(tmpCalleeParam);
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
  const b = {
    a: 1,
    b: 2,
  };
  $( b );
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    if (c) {
      const d = {
        a: 1,
        b: 2,
      };
      $( d );
    }
    else {
      break;
    }
  }
  $( 999 );
}
else {
  $( 999 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 1
 - 4: { a: '1', b: '2' }
 - 5: 1
 - 6: { a: '1', b: '2' }
 - 7: 1
 - 8: { a: '1', b: '2' }
 - 9: 1
 - 10: { a: '1', b: '2' }
 - 11: 1
 - 12: { a: '1', b: '2' }
 - 13: 1
 - 14: { a: '1', b: '2' }
 - 15: 1
 - 16: { a: '1', b: '2' }
 - 17: 1
 - 18: { a: '1', b: '2' }
 - 19: 1
 - 20: { a: '1', b: '2' }
 - 21: 1
 - 22: { a: '1', b: '2' }
 - 23: 1
 - 24: { a: '1', b: '2' }
 - 25: 1
 - 26: { a: '1', b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
