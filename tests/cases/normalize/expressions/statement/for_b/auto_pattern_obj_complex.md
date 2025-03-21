# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For b > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (; $({ a: 1, b: 2 }); $(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
    const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
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
if ($({ a: 1, b: 2 })) {
  while (true) {
    $(1);
    if (!$({ a: 1, b: 2 })) {
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
  while ($({ a: 1, b: 2 })) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
while (true) {
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const c = {
      a: 1,
      b: 2,
    };
    const d = $( c );
    if (d) {

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
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: { a: '1', b: '2' }
 - 4: 1
 - 5: { a: '1', b: '2' }
 - 6: 1
 - 7: { a: '1', b: '2' }
 - 8: 1
 - 9: { a: '1', b: '2' }
 - 10: 1
 - 11: { a: '1', b: '2' }
 - 12: 1
 - 13: { a: '1', b: '2' }
 - 14: 1
 - 15: { a: '1', b: '2' }
 - 16: 1
 - 17: { a: '1', b: '2' }
 - 18: 1
 - 19: { a: '1', b: '2' }
 - 20: 1
 - 21: { a: '1', b: '2' }
 - 22: 1
 - 23: { a: '1', b: '2' }
 - 24: 1
 - 25: { a: '1', b: '2' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
