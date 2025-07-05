# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete $(arg).y);
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpIfTest /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const tmpDeleteObj$1 /*:unknown*/ = $(arg);
    const tmpIfTest$1 /*:boolean*/ = delete tmpDeleteObj$1.y;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
if (delete tmpDeleteObj.y) {
  while (true) {
    $(100);
    const tmpDeleteObj$1 = $(arg);
    if (!delete tmpDeleteObj$1.y) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
if (c) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    const d = $( a );
    const e = delete d.y;
    if (e) {

    }
    else {
      break;
    }
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpDeleteObj = $(arg);
  const tmpIfTest = delete tmpDeleteObj.y;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 100
 - 4: {}
 - 5: 100
 - 6: {}
 - 7: 100
 - 8: {}
 - 9: 100
 - 10: {}
 - 11: 100
 - 12: {}
 - 13: 100
 - 14: {}
 - 15: 100
 - 16: {}
 - 17: 100
 - 18: {}
 - 19: 100
 - 20: {}
 - 21: 100
 - 22: {}
 - 23: 100
 - 24: {}
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
