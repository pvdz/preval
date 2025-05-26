# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new (1, 2, $(b))[$("$")](1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`\$`);
  const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  new tmpNewCallee(1);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
while (true) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCalleeParam];
  new tmpNewCallee(1);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( a );
  const c = $( "$" );
  const d = b[ c ];
  new d( 1 );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCalleeParam];
  a = new tmpNewCallee(1);
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


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
