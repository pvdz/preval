# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpCallCompObj /*:unknown*/ = $(b);
  const tmpCallCompProp /*:unknown*/ = $(`\$`);
  let tmpClusterSSA_a /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCallCompObj$1 /*:unknown*/ = $(b);
      const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
      tmpClusterSSA_a = tmpCallCompObj$1[tmpCallCompProp$1](1);
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
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  let tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
  while (true) {
    if ($(1)) {
      const tmpCallCompObj$1 = $(b);
      const tmpCallCompProp$1 = $(`\$`);
      tmpClusterSSA_a = tmpCallCompObj$1[tmpCallCompProp$1](1);
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
  let e = c[ d ]( 1 );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( b );
      const h = $( "$" );
      e = g[ h ]( 1 );
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


- objects in isFree check
- Computed method call but we dont know whats being called


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
