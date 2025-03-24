# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > For c > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; $(1); a = b?.c.d.e(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  while ($LOOP_UNROLL_10) {
    tmpObjLitVal$1.e(1);
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(undefined);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpObjLitVal$1 = { e: $ };
  while (true) {
    tmpObjLitVal$1.e(1);
    if (!$(1)) {
      break;
    }
  }
  $(undefined);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { e: $ };
  while ($LOOP_UNROLL_10) {
    b.e( 1 );
    const c = $( 1 );
    if (c) {

    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) Calling a static method on an ident that is not global and not recorded in free loop: tmpObjLitVal$1.e


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
