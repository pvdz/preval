# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      a = $(60);
    } else {
      const tmpCalleeParam$1 /*:unknown*/ = $(100);
      a = $(tmpCalleeParam$1);
    }
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
let a = undefined;
$(100);
if ($(1)) {
  a = $(60);
} else {
  a = $($(100));
}
if (a) {
  while (true) {
    $(100);
    if ($(1)) {
      a = $(60);
    } else {
      a = $($(100));
    }
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
let a = undefined;
$( 100 );
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( 1 );
    if (d) {
      a = $( 60 );
    }
    else {
      const e = $( 100 );
      a = $( e );
    }
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 60
 - 4: 100
 - 5: 1
 - 6: 60
 - 7: 100
 - 8: 1
 - 9: 60
 - 10: 100
 - 11: 1
 - 12: 60
 - 13: 100
 - 14: 1
 - 15: 60
 - 16: 100
 - 17: 1
 - 18: 60
 - 19: 100
 - 20: 1
 - 21: 60
 - 22: 100
 - 23: 1
 - 24: 60
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
