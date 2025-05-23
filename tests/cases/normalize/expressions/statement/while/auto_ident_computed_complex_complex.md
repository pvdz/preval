# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ($(b)[$("c")]) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`c`);
const tmpIfTest /*:unknown*/ = tmpCompObj[tmpCalleeParam];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
    const tmpIfTest$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
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
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
if (tmpCompObj[tmpCalleeParam]) {
  while (true) {
    $(100);
    const tmpCompObj$1 = $(b);
    const tmpCalleeParam$1 = $(`c`);
    if (!tmpCompObj$1[tmpCalleeParam$1]) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( a );
    const f = $( "c" );
    const g = e[ f ];
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
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`c`);
  const tmpIfTest = tmpCompObj[tmpCalleeParam];
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 100
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 100
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 100
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 100
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 100
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 100
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 100
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 100
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
