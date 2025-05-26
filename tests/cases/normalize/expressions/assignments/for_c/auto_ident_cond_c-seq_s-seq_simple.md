# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(30);
  if (tmpIfTest$1) {
    a = 60;
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    a = $(tmpCalleeParam);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:unknown*/ = $(30);
      if (tmpIfTest$4) {
        a = 60;
      } else {
        const tmpCalleeParam$1 /*:unknown*/ = $(100);
        a = $(tmpCalleeParam$1);
      }
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
let a = { a: 999, b: 1000 };
if ($(1)) {
  if ($(30)) {
    a = 60;
  } else {
    a = $($(100));
  }
  while (true) {
    if ($(1)) {
      if ($(30)) {
        a = 60;
      } else {
        a = $($(100));
      }
    } else {
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = $( 30 );
  if (c) {
    a = 60;
  }
  else {
    const d = $( 100 );
    a = $( d );
  }
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( 30 );
      if (f) {
        a = 60;
      }
      else {
        const g = $( 100 );
        a = $( g );
      }
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      a = 60;
    } else {
      let tmpCalleeParam = $(100);
      a = $(tmpCalleeParam);
    }
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 1
 - 4: 30
 - 5: 1
 - 6: 30
 - 7: 1
 - 8: 30
 - 9: 1
 - 10: 30
 - 11: 1
 - 12: 30
 - 13: 1
 - 14: 30
 - 15: 1
 - 16: 30
 - 17: 1
 - 18: 30
 - 19: 1
 - 20: 30
 - 21: 1
 - 22: 30
 - 23: 1
 - 24: 30
 - 25: 1
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
