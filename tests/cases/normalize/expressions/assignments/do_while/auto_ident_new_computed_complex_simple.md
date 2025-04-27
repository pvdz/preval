# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident new computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new ($(b)["$"])(1)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
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
$(100);
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
$( 100 );
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


- (todo) objects in isFree check
- (todo) do we want to support NewExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 100
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 100
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 100
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 100
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 100
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
