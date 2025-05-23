# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = new (1, 2, $(b))[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`\$`);
  const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  let tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
      const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
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
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCalleeParam];
  let tmpClusterSSA_a = new tmpNewCallee(1);
  while (true) {
    if ($(1)) {
      const tmpCompObj$1 = $(b);
      const tmpCalleeParam$1 = $(`\$`);
      const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$1];
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
  const d = $( "$" );
  const e = c[ d ];
  let f = new e( 1 );
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( b );
      const i = $( "$" );
      const j = h[ i ];
      f = new j( 1 );
    }
    else {
      break;
    }
  }
  $( f );
}
else {
  const k = {
    a: 999,
    b: 1000,
  };
  $( k );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpCalleeParam = $(`\$`);
    const tmpNewCallee = tmpCompObj[tmpCalleeParam];
    a = new tmpNewCallee(1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) Support this node type in isFree: NewExpression
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 1
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
