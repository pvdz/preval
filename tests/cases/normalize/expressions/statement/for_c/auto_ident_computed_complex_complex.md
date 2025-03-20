# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)[$("c")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`c`);
  tmpCompObj[tmpCompProp];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCompProp$1 /*:unknown*/ = $(`c`);
      tmpCompObj$1[tmpCompProp$1];
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
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
  while (true) {
    if ($(1)) {
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`c`);
      tmpCompObj$1[tmpCompProp$1];
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
if (a) {
  const c = $( b );
  const d = $( "c" );
  c[ d ];
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( b );
      const g = $( "c" );
      f[ g ];
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
$( h, b );
`````


## Todos triggered


- objects in isFree check
- computed property access of an ident where the property ident is not recorded;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1
 - 5: { c: '1' }
 - 6: 'c'
 - 7: 1
 - 8: { c: '1' }
 - 9: 'c'
 - 10: 1
 - 11: { c: '1' }
 - 12: 'c'
 - 13: 1
 - 14: { c: '1' }
 - 15: 'c'
 - 16: 1
 - 17: { c: '1' }
 - 18: 'c'
 - 19: 1
 - 20: { c: '1' }
 - 21: 'c'
 - 22: 1
 - 23: { c: '1' }
 - 24: 'c'
 - 25: 1
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
