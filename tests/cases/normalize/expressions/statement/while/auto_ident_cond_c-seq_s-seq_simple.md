# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((10, 20, $(30)) ? (40, 50, 60) : $($(100))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = 1;
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ /*ternaryConst*/ = 1;
    const tmpIfTest$4 /*:unknown*/ = $(30);
    if (tmpIfTest$4) {
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
let tmpIfTest = 1;
if (!$(30)) {
  tmpIfTest = $($(100));
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$2 = 1;
    if (!$(30)) {
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
let a = 1;
const b = $( 30 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    let d = 1;
    const e = $( 30 );
    if (e) {

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
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpIfTest = 60;
  } else {
    let tmpCalleeParam = $(100);
    tmpIfTest = $(tmpCalleeParam);
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support Literal as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 100
 - 3: 30
 - 4: 100
 - 5: 30
 - 6: 100
 - 7: 30
 - 8: 100
 - 9: 30
 - 10: 100
 - 11: 30
 - 12: 100
 - 13: 30
 - 14: 100
 - 15: 30
 - 16: 100
 - 17: 30
 - 18: 100
 - 19: 30
 - 20: 100
 - 21: 30
 - 22: 100
 - 23: 30
 - 24: 100
 - 25: 30
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
