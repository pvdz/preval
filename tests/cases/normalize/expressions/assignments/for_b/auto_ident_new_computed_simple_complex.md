# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new b[$("$")](1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCalleeParam];
new tmpNewCallee(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$1 /*:unknown*/ = b[tmpCalleeParam$1];
  new tmpNewCallee$1(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCalleeParam];
new tmpNewCallee(1);
while (true) {
  $(1);
  const tmpCalleeParam$1 = $(`\$`);
  const tmpNewCallee$1 = b[tmpCalleeParam$1];
  new tmpNewCallee$1(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
new c( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const d = $( "$" );
  const e = b[ d ];
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
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: '$'
 - 5: 1
 - 6: 1
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: '$'
 - 11: 1
 - 12: 1
 - 13: '$'
 - 14: 1
 - 15: 1
 - 16: '$'
 - 17: 1
 - 18: 1
 - 19: '$'
 - 20: 1
 - 21: 1
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: '$'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
