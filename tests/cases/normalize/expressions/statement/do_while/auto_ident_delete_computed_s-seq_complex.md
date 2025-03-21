# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), arg)[$("y")]);
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
    const tmpIfTest$1 /*:boolean*/ = delete arg[tmpDeleteCompProp$1];
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
$(100);
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
if (delete arg[tmpDeleteCompProp]) {
  while (true) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompProp$1 = $(`y`);
    if (!delete arg[tmpDeleteCompProp$1]) {
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
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const d = $( "y" );
    const e = delete b[ d ];
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
$( f, b );
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
 - 4: 'y'
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 'y'
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 'y'
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 'y'
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 'y'
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
