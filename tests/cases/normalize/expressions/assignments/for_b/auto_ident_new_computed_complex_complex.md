# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new ($(b)[$("$")])(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
new tmpNewCallee(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
  new tmpNewCallee$1(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam];
new tmpNewCallee(1);
while (true) {
  $(1);
  const tmpCompObj$1 = $(b);
  const tmpCalleeParam$1 = $(`\$`);
  const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$1];
  new tmpNewCallee$1(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
new d( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const e = $( a );
  const f = $( "$" );
  const g = e[ f ];
  new g( 1 );
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
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: { $: '"<$>"' }
 - 10: '$'
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: '$'
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 1
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
