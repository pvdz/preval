# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > For c > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, b)[$("c")]);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpCompProp /*:unknown*/ = $(`c`);
  b[tmpCompProp];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompProp$1 /*:unknown*/ = $(`c`);
      b[tmpCompProp$1];
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
const tmpIfTest = $(1);
const b = { c: 1 };
if (tmpIfTest) {
  const tmpCompProp = $(`c`);
  b[tmpCompProp];
  while (true) {
    if ($(1)) {
      const tmpCompProp$1 = $(`c`);
      b[tmpCompProp$1];
    } else {
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
{
  while ($(1)) {
    (1, 2, b)[$(`c`)];
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCompProp = $(`c`);
    tmpCompObj[tmpCompProp];
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
if (a) {
  const c = $( "c" );
  b[ c ];
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( "c" );
      b[ e ];
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: 1
 - 4: 'c'
 - 5: 1
 - 6: 'c'
 - 7: 1
 - 8: 'c'
 - 9: 1
 - 10: 'c'
 - 11: 1
 - 12: 'c'
 - 13: 1
 - 14: 'c'
 - 15: 1
 - 16: 'c'
 - 17: 1
 - 18: 'c'
 - 19: 1
 - 20: 'c'
 - 21: 1
 - 22: 'c'
 - 23: 1
 - 24: 'c'
 - 25: 1
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- computed property access of an ident where the property ident is not recorded;
