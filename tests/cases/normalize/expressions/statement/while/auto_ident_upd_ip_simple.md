# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > While > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while (b++) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
let tmpClusterSSA_b$2 /*:number*/ = 12;
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpPostUpdArgIdent$1 /*:number*/ = tmpClusterSSA_b$2;
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  if (tmpPostUpdArgIdent$1) {
  } else {
    break;
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b$2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
let tmpClusterSSA_b$2 = 12;
$(100);
while (true) {
  $(100);
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_b$2;
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  if (!tmpPostUpdArgIdent$1) {
    break;
  }
}
$({ a: 999, b: 1000 }, tmpClusterSSA_b$2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
let a = 12;
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const b = a;
  a = a + 1;
  if (b) {

  }
  else {
    break;
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
  const tmpIfTest = tmpPostUpdArgIdent;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
