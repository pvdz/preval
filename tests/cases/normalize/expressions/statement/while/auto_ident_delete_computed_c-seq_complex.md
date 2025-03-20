# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Statement > While > Auto ident delete computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete ($(1), $(2), $(arg))[$("y")]) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
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
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 'y'
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: {}
 - 14: 'y'
 - 15: 100
 - 16: 1
 - 17: 2
 - 18: {}
 - 19: 'y'
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 'y'
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
