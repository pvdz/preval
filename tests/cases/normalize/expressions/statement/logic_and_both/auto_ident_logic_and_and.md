# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(1)) && $($(2)) && $($(1)) && $($(1)) && $($(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(1)) && $($(2)) && $($(1)) && $($(1)) && $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpIfTest) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(1);
      tmpIfTest = tmpCallCallee$5(tmpCalleeParam$5);
      if (tmpIfTest) {
        const tmpCallCallee$7 = $;
        const tmpCalleeParam$7 = $(1);
        tmpIfTest = tmpCallCallee$7(tmpCalleeParam$7);
        if (tmpIfTest) {
          const tmpCallCallee$9 = $;
          const tmpCalleeParam$9 = $(2);
          tmpCallCallee$9(tmpCalleeParam$9);
        } else {
        }
      } else {
      }
    } else {
    }
  } else {
  }
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$5 = $(1);
      const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$5);
      if (tmpClusterSSA_tmpIfTest$3) {
        const tmpCalleeParam$7 = $(1);
        const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$7);
        if (tmpClusterSSA_tmpIfTest$5) {
          const tmpCalleeParam$9 = $(2);
          $(tmpCalleeParam$9);
        } else {
        }
      } else {
      }
    } else {
    }
  } else {
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
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    if (f) {
      const g = $( 1 );
      const h = $( g );
      if (h) {
        const i = $( 1 );
        const j = $( i );
        if (j) {
          const k = $( 2 );
          $( k );
        }
      }
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
