# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Statement > While > Auto ident new computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while (new (1, 2, b)[$("$")](1)) $(100);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:unknown*/ = $(`\$`);
  const tmpNewCallee /*:unknown*/ = b[tmpCalleeParam];
  new tmpNewCallee(1);
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
while (true) {
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = b[tmpCalleeParam];
  new tmpNewCallee(1);
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( "$" );
  const c = a[ b ];
  new c( 1 );
  $( 100 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = b;
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCalleeParam];
  const tmpIfTest = new tmpNewCallee(1);
  if (tmpIfTest) {
    $(100);
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
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: '$'
 - 5: 1
 - 6: 100
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: '$'
 - 11: 1
 - 12: 100
 - 13: '$'
 - 14: 1
 - 15: 100
 - 16: '$'
 - 17: 1
 - 18: 100
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: '$'
 - 23: 1
 - 24: 100
 - 25: '$'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
