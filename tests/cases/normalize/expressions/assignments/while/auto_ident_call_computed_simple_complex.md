# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > While > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = b[$("$")](1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpMCCP$1 /*:unknown*/ = $(`\$`);
    const tmpMCF$1 /*:unknown*/ = b[tmpMCCP$1];
    a = $dotCall(tmpMCF$1, b, undefined, 1);
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpMCCP = $(`\$`);
const b = { $: $ };
const tmpClusterSSA_a = b[tmpMCCP](1);
if (tmpClusterSSA_a) {
  while (true) {
    $(100);
    const tmpMCCP$1 = $(`\$`);
    a = b[tmpMCCP$1](1);
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( "$" );
const c = { $: $ };
const d = c[ b ];
const e = $dotCall( d, c, undefined, 1 );
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( "$" );
    const g = c[ f ];
    a = $dotCall( g, c, undefined, 1 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( e );
}
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
