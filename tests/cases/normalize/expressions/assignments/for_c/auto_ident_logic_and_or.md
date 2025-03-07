# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > For c > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = ($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$1);
  } else {
  }
  if (a) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$2);
      if (a) {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        a = $(tmpCalleeParam$4);
      } else {
      }
      if (a) {
      } else {
        const tmpCalleeParam$6 /*:unknown*/ = $(2);
        $(tmpCalleeParam$6);
      }
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($(1)) {
  a = $($(1));
  if (a) {
    a = $($(1));
  }
  if (!a) {
    $($(2));
  }
  while (true) {
    if ($(1)) {
      a = $($(1));
      if (a) {
        a = $($(1));
      }
      if (!a) {
        $($(2));
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = ($($(1)) && $($(1))) || $($(2));
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
    a = $(tmpCalleeParam);
    if (a) {
      const tmpCalleeParam$1 = $(1);
      a = $(tmpCalleeParam$1);
    } else {
    }
    if (a) {
    } else {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = $( 1 );
  a = $( c );
  if (a) {
    const d = $( 1 );
    a = $( d );
  }
  if (a) {

  }
  else {
    const e = $( 2 );
    $( e );
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( 1 );
      a = $( g );
      if (a) {
        const h = $( 1 );
        a = $( h );
      }
      if (a) {

      }
      else {
        const i = $( 2 );
        $( i );
      }
    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check