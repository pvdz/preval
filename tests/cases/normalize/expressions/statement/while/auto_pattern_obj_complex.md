# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > While > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
while ($({ a: 1, b: 2 })) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1, b: 2 };
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
  let tmpCalleeParam = { a: 1, b: 2 };
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: { a: '1', b: '2' }
 - 4: 100
 - 5: { a: '1', b: '2' }
 - 6: 100
 - 7: { a: '1', b: '2' }
 - 8: 100
 - 9: { a: '1', b: '2' }
 - 10: 100
 - 11: { a: '1', b: '2' }
 - 12: 100
 - 13: { a: '1', b: '2' }
 - 14: 100
 - 15: { a: '1', b: '2' }
 - 16: 100
 - 17: { a: '1', b: '2' }
 - 18: 100
 - 19: { a: '1', b: '2' }
 - 20: 100
 - 21: { a: '1', b: '2' }
 - 22: 100
 - 23: { a: '1', b: '2' }
 - 24: 100
 - 25: { a: '1', b: '2' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
