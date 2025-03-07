# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(1)) && $($(2)));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    $(tmpCalleeParam$1);
  } else {
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$2);
      if (tmpIfTest$4) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        $(tmpCalleeParam$4);
      } else {
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
  if ($($(1))) {
    $($(2));
  }
  while (true) {
    if ($(1)) {
      if ($($(1))) {
        $($(2));
      }
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($(1)) && $($(2));
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = $(1);
    const tmpIfTest$1 = $(tmpCalleeParam);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 = $(2);
      $(tmpCalleeParam$1);
    } else {
    }
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( b );
  if (c) {
    const d = $( 2 );
    $( d );
  }
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( 1 );
      const g = $( f );
      if (g) {
        const h = $( 2 );
        $( h );
      }
    }
    else {
      break;
    }
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 2
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
