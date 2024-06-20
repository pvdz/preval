# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > For c > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($(1)) && $($(1)) && $($(2));
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest$1) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpIfTest$1) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpCallCallee$3(tmpCalleeParam$3);
      } else {
      }
    } else {
    }
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    } else {
    }
  } else {
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      const tmpCalleeParam$2 = $(1);
      const tmpIfTest$4 = $(tmpCalleeParam$2);
      if (tmpIfTest$4) {
        const tmpCalleeParam$4 = $(1);
        const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$4);
        if (tmpClusterSSA_tmpIfTest$2) {
          const tmpCalleeParam$6 = $(2);
          $(tmpCalleeParam$6);
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( b );
  if (c) {
    const d = $( 1 );
    const e = $( d );
    if (e) {
      const f = $( 2 );
      $( f );
    }
  }
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 1 );
      const i = $( h );
      if (i) {
        const j = $( 1 );
        const k = $( j );
        if (k) {
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
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
