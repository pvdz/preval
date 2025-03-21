# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > For c > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); (10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(30);
  if (tmpIfTest$1) {
    $(2);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    $(tmpCalleeParam);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:unknown*/ = $(30);
      if (tmpIfTest$4) {
        $(2);
      } else {
        const tmpCalleeParam$1 /*:unknown*/ = $(100);
        $(tmpCalleeParam$1);
      }
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
if ($(1)) {
  if ($(30)) {
    $(2);
  } else {
    $($(100));
  }
  while (true) {
    if ($(1)) {
      if ($(30)) {
        $(2);
      } else {
        $($(100));
      }
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 30 );
  if (b) {
    $( 2 );
  }
  else {
    const c = $( 100 );
    $( c );
  }
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( 30 );
      if (e) {
        $( 2 );
      }
      else {
        const f = $( 100 );
        $( f );
      }
    }
    else {
      break;
    }
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 2
 - 4: 1
 - 5: 30
 - 6: 2
 - 7: 1
 - 8: 30
 - 9: 2
 - 10: 1
 - 11: 30
 - 12: 2
 - 13: 1
 - 14: 30
 - 15: 2
 - 16: 1
 - 17: 30
 - 18: 2
 - 19: 1
 - 20: 30
 - 21: 2
 - 22: 1
 - 23: 30
 - 24: 2
 - 25: 1
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
