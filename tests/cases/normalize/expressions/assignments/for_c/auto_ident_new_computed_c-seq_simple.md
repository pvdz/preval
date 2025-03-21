# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident new computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = new (1, 2, $(b))["$"](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  let tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
      tmpClusterSSA_a = new tmpNewCallee$1(1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const b = { $: $ };
  const tmpNewCallee = $(b).$;
  let tmpClusterSSA_a = new tmpNewCallee(1);
  while (true) {
    if ($(1)) {
      const tmpNewCallee$1 = $(b).$;
      tmpClusterSSA_a = new tmpNewCallee$1(1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = c.$;
  let e = new d( 1 );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( b );
      const h = g.$;
      e = new h( 1 );
    }
    else {
      break;
    }
  }
  $( e );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  $( i );
}
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 1
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 1
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 1
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
