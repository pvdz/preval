# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > For c > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($(0)) || $($(1)) || $($(2));
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
    const tmpCalleeParam = $(0);
    let tmpIfTest$1 = $(tmpCalleeParam);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$1 = $(1);
      tmpIfTest$1 = $(tmpCalleeParam$1);
      if (tmpIfTest$1) {
      } else {
        const tmpCalleeParam$3 = $(2);
        $(tmpCalleeParam$3);
      }
    }
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpCalleeParam$2 /*:unknown*/ = $(0);
      const tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$2);
      if (tmpIfTest$4) {
      } else {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        const tmpClusterSSA_tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$4);
        if (tmpClusterSSA_tmpIfTest$2) {
        } else {
          const tmpCalleeParam$6 /*:unknown*/ = $(2);
          $(tmpCalleeParam$6);
        }
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

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 0 );
  const c = $( b );
  if (c) {

  }
  else {
    const d = $( 1 );
    const e = $( d );
    if (e) {

    }
    else {
      const f = $( 2 );
      $( f );
    }
  }
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 0 );
      const i = $( h );
      if (i) {

      }
      else {
        const j = $( 1 );
        const k = $( j );
        if (k) {

        }
        else {
          const l = $( 2 );
          $( l );
        }
      }
    }
    else {
      break;
    }
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
