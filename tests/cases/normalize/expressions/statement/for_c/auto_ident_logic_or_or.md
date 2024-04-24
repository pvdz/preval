# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > For c > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

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
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest$1) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpIfTest$1) {
      } else {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpCallCallee$3(tmpCalleeParam$3);
      }
    }
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
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
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$2 = $(0);
      let tmpIfTest$2 = $(tmpCalleeParam$2);
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$4 = $(1);
        tmpIfTest$2 = $(tmpCalleeParam$4);
        if (tmpIfTest$2) {
        } else {
          const tmpCalleeParam$6 = $(2);
          $(tmpCalleeParam$6);
        }
      }
      tmpIfTest = $(1);
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
let a = $( 1 );
if (a) {
  const b = $( 0 );
  let c = $( b );
  if (c) {

  }
  else {
    const d = $( 1 );
    c = $( d );
    if (c) {

    }
    else {
      const e = $( 2 );
      $( e );
    }
  }
  a = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      const f = $( 0 );
      let g = $( f );
      if (g) {

      }
      else {
        const h = $( 1 );
        g = $( h );
        if (g) {

        }
        else {
          const i = $( 2 );
          $( i );
        }
      }
      a = $( 1 );
    }
    else {
      break;
    }
  }
}
const j = {
a: 999,
b: 1000
;
$( j );
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
