# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For a > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (a = (1, 2, b)[$("$")](1); ; $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
b[tmpCallCompProp](1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
({ $: $ }[tmpCallCompProp](1));
while (true) {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
b[ a ]( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
`````


## Todos triggered


- Computed method call but we dont know whats being called


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
