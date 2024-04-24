# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

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
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
    if (tmpIfTest) {
      const tmpCalleeParam$5 = $(1);
      tmpIfTest = $(tmpCalleeParam$5);
      if (tmpIfTest) {
        const tmpCalleeParam$7 = $(1);
        tmpIfTest = $(tmpCalleeParam$7);
        if (tmpIfTest) {
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
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
    if (b) {
      const e = $( 1 );
      b = $( e );
      if (b) {
        const f = $( 1 );
        b = $( f );
        if (b) {
          const g = $( 2 );
          $( g );
        }
      }
    }
  }
}
const h = {
a: 999,
b: 1000
;
$( h );
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
