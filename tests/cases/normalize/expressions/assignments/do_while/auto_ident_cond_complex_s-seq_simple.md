# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
$(100);
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
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
let a = 60;
$(100);
if (!$(1)) {
  a = $($(100));
}
if (a) {
  while (true) {
    $(100);
    if (!$(1)) {
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
let a = 60;
$( 100 );
const b = $( 1 );
if (b) {

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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = 60;
  } else {
    let tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support Literal as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
