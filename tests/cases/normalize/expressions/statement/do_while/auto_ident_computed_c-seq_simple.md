# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((1, 2, $(b))[$("c")]);
$(a, b);
`````

## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const tmpIfTest /*:unknown*/ = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`c`);
    const tmpIfTest$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
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
$(100);
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
if (tmpCompObj[tmpCompProp]) {
  while (true) {
    $(100);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`c`);
    if (!tmpCompObj$1[tmpCompProp$1]) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((1, 2, $(b))[$(`c`)]) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpIfTest = tmpCompObj[tmpCompProp];
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 100
 - 5: { c: '1' }
 - 6: 'c'
 - 7: 100
 - 8: { c: '1' }
 - 9: 'c'
 - 10: 100
 - 11: { c: '1' }
 - 12: 'c'
 - 13: 100
 - 14: { c: '1' }
 - 15: 'c'
 - 16: 100
 - 17: { c: '1' }
 - 18: 'c'
 - 19: 100
 - 20: { c: '1' }
 - 21: 'c'
 - 22: 100
 - 23: { c: '1' }
 - 24: 'c'
 - 25: 100
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check