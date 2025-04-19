# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b)[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpMCCP /*:unknown*/ = $(`\$`);
  const b /*:object*/ = { $: $ };
  const tmpMCF /*:unknown*/ = b[tmpMCCP];
  let tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpMCCP$1 /*:unknown*/ = $(`\$`);
      const tmpMCF$1 /*:unknown*/ = b[tmpMCCP$1];
      tmpClusterSSA_a = $dotCall(tmpMCF$1, b, undefined, 1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpMCCP = $(`\$`);
  const b = { $: $ };
  let tmpClusterSSA_a = b[tmpMCCP](1);
  while (true) {
    if ($(1)) {
      const tmpMCCP$1 = $(`\$`);
      tmpClusterSSA_a = b[tmpMCCP$1](1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( "$" );
  const c = { $: $ };
  const d = c[ b ];
  let e = $dotCall( d, c, undefined, 1 );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( "$" );
      const h = c[ g ];
      e = $dotCall( h, c, undefined, 1 );
    }
    else {
      break;
    }
  }
  $( e );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  $( i );
}
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) - at least one of the frfr args was not isFree, bailing


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: '$'
 - 6: 1
 - 7: 1
 - 8: '$'
 - 9: 1
 - 10: 1
 - 11: '$'
 - 12: 1
 - 13: 1
 - 14: '$'
 - 15: 1
 - 16: 1
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: '$'
 - 21: 1
 - 22: 1
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
