# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new (1, 2, $(b)).$(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  new tmpNewCallee(1);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
while (true) {
  const tmpNewCallee = $(b).$;
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
  const c = b.$;
  new c( 1 );
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
  const tmpNewCallee = tmpCompObj.$;
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
 - 2: 1
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 1
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 1
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
