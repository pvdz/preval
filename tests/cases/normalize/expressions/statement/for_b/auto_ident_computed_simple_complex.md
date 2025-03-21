# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > For b > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; b[$("c")]; $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpIfTest /*:unknown*/ = b[tmpCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCompProp$1 /*:unknown*/ = $(`c`);
    const tmpIfTest$1 /*:unknown*/ = b[tmpCompProp$1];
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
if (b[tmpCompProp]) {
  while (true) {
    $(1);
    const tmpCompProp$1 = $(`c`);
    if (!b[tmpCompProp$1]) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $( "c" );
    const e = b[ d ];
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
 - 1: 'c'
 - 2: 1
 - 3: 'c'
 - 4: 1
 - 5: 'c'
 - 6: 1
 - 7: 'c'
 - 8: 1
 - 9: 'c'
 - 10: 1
 - 11: 'c'
 - 12: 1
 - 13: 'c'
 - 14: 1
 - 15: 'c'
 - 16: 1
 - 17: 'c'
 - 18: 1
 - 19: 'c'
 - 20: 1
 - 21: 'c'
 - 22: 1
 - 23: 'c'
 - 24: 1
 - 25: 'c'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
