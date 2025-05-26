# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic ll simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (0 || $($(1)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if ($($(1))) {
  while (true) {
    $(100);
    if (!$($(1))) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 1 );
const b = $( a );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( 1 );
    const d = $( c );
    if (d) {

    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = 0;
  if (tmpIfTest) {
  } else {
    let tmpCalleeParam = $(1);
    tmpIfTest = $(tmpCalleeParam);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
