# Preval test case

# optional_chain_known_obj.md

> Optional chaining > Optional chain known obj
>
> Need to sanitize this example but if we know that a value is an object
> then we can safely drop `?.` applied to it, in all its variations.

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
while ((a = b?.c(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
let a /*:unknown*/ = $dotCall($, b, `c`, 1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 /*:unknown*/ = b.c;
    a = $dotCall(tmpChainElementObject$1, b, `c`, 1);
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
const b = { c: $ };
let a = $dotCall($, b, `c`, 1);
if (a) {
  while (true) {
    $(100);
    a = b.c(1);
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
const a = { c: $ };
let b = $dotCall( $, a, "c", 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = a.c;
    b = $dotCall( c, a, "c", 1 );
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


- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
