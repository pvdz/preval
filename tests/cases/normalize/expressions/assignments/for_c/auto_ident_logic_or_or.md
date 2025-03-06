# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For c > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($(0)) || $($(1)) || $($(2));
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
    a = $(tmpCalleeParam);
    if (a) {
    } else {
      const tmpCalleeParam$1 = $(1);
      a = $(tmpCalleeParam$1);
      if (a) {
      } else {
        const tmpCalleeParam$3 = $(2);
        a = $(tmpCalleeParam$3);
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
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a) {
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(0);
      a = $(tmpCalleeParam$2);
      if (a) {
      } else {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$4);
        if (tmpClusterSSA_a$1) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = $( 0 );
  a = $( c );
  if (a) {

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
      a = $( h );
      if (a) {

      }
      else {
        const i = $( 1 );
        const j = $( i );
        if (j) {

        }
        else {
          const k = $( 2 );
          $( k );
        }
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

Todos triggered:
- objects in isFree check