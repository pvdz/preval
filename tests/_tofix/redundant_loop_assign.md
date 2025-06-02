# Preval test case

# redundant_loop_assign.md

> Tofix > redundant loop assign
>
> Normalization of assignments should work the same everywhere they are

In this case we could detect that a invariantly becomes `{b:2}` after
entering the loop. The final result will force a.b=2 and we know that
all values assigned to a are bland objects that don't leak and are not
observed before the final statement. Since the intermediate state does
not matter (not observed), we can infer that the object shape expects
b to be 2 regardless, and just inline all other cases.

_THEN_, if we have something like that in place, we can compare the 
shapes being assigned to a and realize that it's always a plain object
with b:2 and that the object does not leak inside the loop. This makes
the assignments inside the loop redundant and we can detect it.

## Input

`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  a = { b: tmpObjLitVal };                        //<- a={b:2}
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 /*:unknown*/ = $(1);
      a = { b: tmpObjLitVal$1 };                  //<- a={b:2}, redundant
    } else {
      break;
    }
  }
} else {
}
a.b = 2;
$(a);
`````


## Settled


`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  a = { b: tmpObjLitVal };
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 /*:unknown*/ = $(1);
      a = { b: tmpObjLitVal$1 };
    } else {
      break;
    }
  }
} else {
}
a.b = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($(1)) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  while (true) {
    if ($(1)) {
      const tmpObjLitVal$1 = $(1);
      a = { b: tmpObjLitVal$1 };
    } else {
      break;
    }
  }
}
a.b = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = $( 1 );
  a = { b: c };
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( 1 );
      a = { b: e };
    }
    else {
      break;
    }
  }
}
a.b = 2;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 = $(1);
      a = { b: tmpObjLitVal$1 };
    } else {
      break;
    }
  }
} else {
}
a.b = 2;
$(a);
`````


## Todos triggered


None


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
