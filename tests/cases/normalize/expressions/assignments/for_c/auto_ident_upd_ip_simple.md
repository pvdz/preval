# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = b++);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpClusterSSA_b /*:number*/ = 2;
  let tmpClusterSSA_a /*:unknown*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_b;
      tmpClusterSSA_b = tmpClusterSSA_b + 1;
      tmpClusterSSA_a = tmpPostUpdArgIdent$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_b = 2;
  let tmpClusterSSA_a = 1;
  while (true) {
    if ($(1)) {
      const tmpPostUpdArgIdent$1 = tmpClusterSSA_b;
      tmpClusterSSA_b = tmpClusterSSA_b + 1;
      tmpClusterSSA_a = tmpPostUpdArgIdent$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  let b = 2;
  let c = 1;
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = b;
      b = b + 1;
      c = e;
    }
    else {
      break;
    }
  }
  $( c, b );
}
else {
  const f = {
    a: 999,
    b: 1000,
  };
  $( f, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(b, `number`);
    b = tmpPostUpdArgIdent + 1;
    a = tmpPostUpdArgIdent;
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
