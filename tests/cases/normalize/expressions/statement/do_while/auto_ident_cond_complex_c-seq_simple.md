# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ /*ternaryConst*/ = undefined;
    const tmpIfTest$4 /*:unknown*/ = $(1);
    if (tmpIfTest$4) {
      tmpIfTest$2 = $(60);
    } else {
      const tmpCalleeParam$1 /*:unknown*/ = $(100);
      tmpIfTest$2 = $(tmpCalleeParam$1);
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
let tmpIfTest = undefined;
if ($(1)) {
  tmpIfTest = $(60);
} else {
  tmpIfTest = $($(100));
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$2 = undefined;
    if ($(1)) {
      tmpIfTest$2 = $(60);
    } else {
      tmpIfTest$2 = $($(100));
    }
    if (!tmpIfTest$2) {
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
    $( 100 );
    let d = undefined;
    const e = $( 1 );
    if (e) {
      d = $( 60 );
    }
    else {
      const f = $( 100 );
      d = $( f );
    }
    if (d) {

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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpIfTest = $(60);
  } else {
    let tmpCalleeParam = $(100);
    tmpIfTest = $(tmpCalleeParam);
  }
  if (tmpIfTest) {
  } else {
    break;
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
