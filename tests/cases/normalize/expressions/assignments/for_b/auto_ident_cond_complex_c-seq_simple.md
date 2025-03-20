# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $(1) ? (40, 50, $(60)) : $($(100))); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
if ($(1)) {
  a = $(60);
} else {
  a = $($(100));
}
if (a) {
  while (true) {
    $(1);
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
    $( 1 );
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
 - 1: 1
 - 2: 60
 - 3: 1
 - 4: 1
 - 5: 60
 - 6: 1
 - 7: 1
 - 8: 60
 - 9: 1
 - 10: 1
 - 11: 60
 - 12: 1
 - 13: 1
 - 14: 60
 - 15: 1
 - 16: 1
 - 17: 60
 - 18: 1
 - 19: 1
 - 20: 60
 - 21: 1
 - 22: 1
 - 23: 60
 - 24: 1
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
