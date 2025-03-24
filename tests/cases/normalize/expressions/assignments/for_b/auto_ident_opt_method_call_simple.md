# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for (; (a = b?.c(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpChainElementCall$1 /*:unknown*/ = b.c(1);
    a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { c: $ };
const tmpChainElementCall = b.c(1);
if (tmpChainElementCall) {
  while (true) {
    $(1);
    const tmpChainElementCall$1 = b.c(1);
    a = tmpChainElementCall$1;
    if (!tmpChainElementCall$1) {
      break;
    }
  }
  $(a);
} else {
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { c: $ };
const c = b.c( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = b.c( 1 );
    a = d;
    if (d) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) Calling a static method on an ident that is not global and not recorded in free loop: b.c


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
