# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || $($(1)) || $($(2)) || $($(0)) || $($(1)) || $($(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || $($(1)) || $($(2)) || $($(0)) || $($(1)) || $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$5 = $(0);
      tmpIfTest = $(tmpCalleeParam$5);
      if (tmpIfTest) {
      } else {
        const tmpCalleeParam$7 = $(1);
        tmpIfTest = $(tmpCalleeParam$7);
        if (tmpIfTest) {
        } else {
          const tmpCalleeParam$9 = $(2);
          $(tmpCalleeParam$9);
        }
      }
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(0);
      const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$5);
      if (tmpClusterSSA_tmpIfTest$3) {
      } else {
        const tmpCalleeParam$7 /*:unknown*/ = $(1);
        const tmpClusterSSA_tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$7);
        if (tmpClusterSSA_tmpIfTest$5) {
        } else {
          const tmpCalleeParam$9 /*:unknown*/ = $(2);
          $(tmpCalleeParam$9);
        }
      }
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {

  }
  else {
    const e = $( 2 );
    const f = $( e );
    if (f) {

    }
    else {
      const g = $( 0 );
      const h = $( g );
      if (h) {

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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
