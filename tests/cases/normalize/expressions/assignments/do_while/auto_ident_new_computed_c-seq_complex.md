# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new (1, 2, $(b))[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
new tmpNewCallee(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
  new tmpNewCallee$1(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam];
new tmpNewCallee(1);
while (true) {
  $(100);
  const tmpCompObj$1 = $(b);
  const tmpCalleeParam$1 = $(`\$`);
  const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$1];
  new tmpNewCallee$1(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
new d( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const e = $( a );
  const f = $( "$" );
  const g = e[ f ];
  new g( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCalleeParam];
  a = new tmpNewCallee(1);
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support NewExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 100
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 100
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
