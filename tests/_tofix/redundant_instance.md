# Preval test case

# redundant_instance.md

> Tofix > redundant instance

When replacing an object reference with a new object reference of exactly the same shape,
when the old object instance can not be observed, we would not need to create a new object
at all. Instead we can update the old instance...

## Input

`````js filename=intro
const anything /*:unknown*/ = $(1);
let obj /*:object*/ = { b: anything };
while ($LOOP_UNROLL_10) {
  const test /*:unknown*/ = $(1);
  if (test) {
    const newvalue /*:unknown*/ = $(1);
    // object shape is equal and `obj` has not been observed yet
    obj = { b: newvalue };                    // <- obj.b = newvalue  ?
  } else {
    break;
  }
}
$(obj);
`````


## Settled


`````js filename=intro
const anything /*:unknown*/ = $(1);
const test /*:unknown*/ = $(1);
if (test) {
  const newvalue /*:unknown*/ = $(1);
  let tmpClusterSSA_obj /*:object*/ = { b: newvalue };
  while ($LOOP_UNROLL_9) {
    const test$1 /*:unknown*/ = $(1);
    if (test$1) {
      const newvalue$1 /*:unknown*/ = $(1);
      tmpClusterSSA_obj = { b: newvalue$1 };
    } else {
      break;
    }
  }
  $(tmpClusterSSA_obj);
} else {
  const obj /*:object*/ = { b: anything };
  $(obj);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const anything = $(1);
if ($(1)) {
  const newvalue = $(1);
  let tmpClusterSSA_obj = { b: newvalue };
  while (true) {
    if ($(1)) {
      const newvalue$1 = $(1);
      tmpClusterSSA_obj = { b: newvalue$1 };
    } else {
      break;
    }
  }
  $(tmpClusterSSA_obj);
} else {
  $({ b: anything });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
if (b) {
  const c = $( 1 );
  let d = { b: c };
  while ($LOOP_UNROLL_9) {
    const e = $( 1 );
    if (e) {
      const f = $( 1 );
      d = { b: f };
    }
    else {
      break;
    }
  }
  $( d );
}
else {
  const g = { b: a };
  $( g );
}
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
