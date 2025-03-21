# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > While > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete arg[$("y")]) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
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
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
if (delete arg[tmpDeleteCompProp]) {
  while (true) {
    $(100);
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
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
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
 - 1: 'y'
 - 2: 100
 - 3: 'y'
 - 4: 100
 - 5: 'y'
 - 6: 100
 - 7: 'y'
 - 8: 100
 - 9: 'y'
 - 10: 100
 - 11: 'y'
 - 12: 100
 - 13: 'y'
 - 14: 100
 - 15: 'y'
 - 16: 100
 - 17: 'y'
 - 18: 100
 - 19: 'y'
 - 20: 100
 - 21: 'y'
 - 22: 100
 - 23: 'y'
 - 24: 100
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
