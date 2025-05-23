# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Do while > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
do {
  $(100);
} while ($({ a: 1, b: 2 }));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
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
$(100);
if ($({ a: 1, b: 2 })) {
  while (true) {
    $(100);
    if (!$({ a: 1, b: 2 })) {
      break;
    }
  }
  $(999);
} else {
  $(999);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternObjRoot = { a: 999, b: 1000 };
let a = tmpBindingPatternObjRoot.a;
while (true) {
  $(100);
  let tmpCalleeParam = { a: 1, b: 2 };
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: 100
 - 4: { a: '1', b: '2' }
 - 5: 100
 - 6: { a: '1', b: '2' }
 - 7: 100
 - 8: { a: '1', b: '2' }
 - 9: 100
 - 10: { a: '1', b: '2' }
 - 11: 100
 - 12: { a: '1', b: '2' }
 - 13: 100
 - 14: { a: '1', b: '2' }
 - 15: 100
 - 16: { a: '1', b: '2' }
 - 17: 100
 - 18: { a: '1', b: '2' }
 - 19: 100
 - 20: { a: '1', b: '2' }
 - 21: 100
 - 22: { a: '1', b: '2' }
 - 23: 100
 - 24: { a: '1', b: '2' }
 - 25: 100
 - 26: { a: '1', b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
