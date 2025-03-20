# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > For c > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(60);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    $(tmpCalleeParam);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:unknown*/ = $(1);
      if (tmpIfTest$4) {
        $(60);
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
  if ($(1)) {
    $(60);
  } else {
    $($(100));
  }
  while (true) {
    if ($(1)) {
      if ($(1)) {
        $(60);
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
  const b = $( 1 );
  if (b) {
    $( 60 );
  }
  else {
    const c = $( 100 );
    $( c );
  }
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( 1 );
      if (e) {
        $( 60 );
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 60
 - 4: 1
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
