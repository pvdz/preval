# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), $(arg))[$("y")]);
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
$(1);
$(2);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpIfTest /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
    const tmpIfTest$1 /*:boolean*/ = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
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
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
if (delete tmpDeleteCompObj[tmpDeleteCompProp]) {
  while (true) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompObj$1 = $(arg);
    const tmpDeleteCompProp$1 = $(`y`);
    if (!delete tmpDeleteCompObj$1[tmpDeleteCompProp$1]) {
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
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const e = $( a );
    const f = $( "y" );
    const g = delete e[ f ];
    if (g) {

    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: {}
 - 10: 'y'
 - 11: 100
 - 12: 1
 - 13: 2
 - 14: {}
 - 15: 'y'
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
