# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(0)) || 2);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  $(tmpCalleeParam);
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(0);
      $(tmpCalleeParam$1);
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
if ($(1)) {
  $($(0));
  while (true) {
    if ($(1)) {
      $($(0));
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
  const b = $( 0 );
  $( b );
  while ($LOOP_UNROLLS_LEFT_10) {
    const c = $( 1 );
    if (c) {
      const d = $( 0 );
      $( d );
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let tmpCalleeParam = $(0);
    const tmpIfTest$1 = $(tmpCalleeParam);
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
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 0
 - 9: 0
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 0
 - 15: 0
 - 16: 1
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 0
 - 21: 0
 - 22: 1
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
