# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident call prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, b).$(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
let a /*:unknown*/ = b.$(1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    a = b.$(1);
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
let a = b.$(1);
if (a) {
  while (true) {
    $(1);
    a = b.$(1);
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
let b = a.$( 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    b = a.$( 1 );
    if (b) {

    }
    else {
      break;
    }
  }
  $( b );
}
else {
  $( b );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
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
