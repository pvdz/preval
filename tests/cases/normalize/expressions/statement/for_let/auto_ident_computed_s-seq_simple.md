# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > For let > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = (1, 2, b)[$("c")]; ; $(1)) $(xyz);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const xyz /*:unknown*/ = b[tmpCompProp];
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
while (true) {
  $(b[tmpCompProp]);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b[ a ];
  $( c );
  $( 1 );
}
`````


## Todos triggered


- computed property access of an ident where the property ident is not recorded;
- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
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
