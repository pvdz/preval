# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); delete $(arg)[$("y")]);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ /*truthy*/ = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompObj /*:unknown*/ = $(arg);
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  delete tmpDeleteCompObj[tmpDeleteCompProp];
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
      const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
      delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
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
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  delete tmpDeleteCompObj[tmpDeleteCompProp];
  while (true) {
    if ($(1)) {
      const tmpDeleteCompObj$1 = $(arg);
      const tmpDeleteCompProp$1 = $(`y`);
      delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  const c = $( b );
  const d = $( "y" );
  delete c[ d ];
  while ($LOOP_UNROLLS_LEFT_10) {
    const e = $( 1 );
    if (e) {
      const f = $( b );
      const g = $( "y" );
      delete f[ g ];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $(`y`);
    delete tmpDeleteCompObj[tmpDeleteCompProp];
  } else {
    break;
  }
}
$(a, arg);
`````


## Todos triggered


- (todo) do we want to support UnaryExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 1
 - 5: {}
 - 6: 'y'
 - 7: 1
 - 8: {}
 - 9: 'y'
 - 10: 1
 - 11: {}
 - 12: 'y'
 - 13: 1
 - 14: {}
 - 15: 'y'
 - 16: 1
 - 17: {}
 - 18: 'y'
 - 19: 1
 - 20: {}
 - 21: 'y'
 - 22: 1
 - 23: {}
 - 24: 'y'
 - 25: 1
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
