# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$2 /*:unknown*/ = $(30);
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
if (!$(30)) {
  a = $($(100));
}
if (a) {
  while (true) {
    $(1);
    if (!$(30)) {
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
const b = $( 30 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $( 30 );
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
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    a = 60;
  } else {
    let tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
 - 1: 30
 - 2: 1
 - 3: 30
 - 4: 1
 - 5: 30
 - 6: 1
 - 7: 30
 - 8: 1
 - 9: 30
 - 10: 1
 - 11: 30
 - 12: 1
 - 13: 30
 - 14: 1
 - 15: 30
 - 16: 1
 - 17: 30
 - 18: 1
 - 19: 30
 - 20: 1
 - 21: 30
 - 22: 1
 - 23: 30
 - 24: 1
 - 25: 30
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
