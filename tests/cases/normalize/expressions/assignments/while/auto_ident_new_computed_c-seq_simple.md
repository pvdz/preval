# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident new computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new (1, 2, $(b))["$"](1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
new tmpNewCallee(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
  new tmpNewCallee$1(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = $(b).$;
new tmpNewCallee(1);
while (true) {
  $(100);
  const tmpNewCallee$1 = $(b).$;
  new tmpNewCallee$1(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
new c( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const d = $( a );
  const e = d.$;
  new e( 1 );
}
`````


## Todos triggered


- (todo) do we want to support NewExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 100
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 100
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 100
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 100
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 100
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
