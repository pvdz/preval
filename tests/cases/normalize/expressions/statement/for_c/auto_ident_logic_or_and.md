# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > For c > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($(0)) || ($($(1)) && $($(2)));
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
    const tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest$1) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      const tmpIfTest$3 = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpIfTest$3) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpCallCallee$3(tmpCalleeParam$3);
      } else {
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
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpIfTest$3 = $(tmpCalleeParam$1);
    if (tmpIfTest$3) {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    } else {
    }
  }
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$2 = $(0);
      const tmpIfTest$2 = $(tmpCalleeParam$2);
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$4 = $(1);
        const tmpIfTest$4 = $(tmpCalleeParam$4);
        if (tmpIfTest$4) {
          const tmpCalleeParam$6 = $(2);
          $(tmpCalleeParam$6);
        } else {
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
let b = true;
if (a) {
  const c = $( 0 );
  const d = $( c );
  if (d) {

  }
  else {
    const e = $( 1 );
    const f = $( e );
    if (f) {
      const g = $( 2 );
      $( g );
    }
  }
  a = $( 1 );
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      const h = $( 0 );
      const i = $( h );
      if (i) {

      }
      else {
        const j = $( 1 );
        const k = $( j );
        if (k) {
          const l = $( 2 );
          $( l );
        }
      }
      a = $( 1 );
    }
    else {
      break;
    }
  }
}
const m = {
a: 999,
b: 1000
;
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
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 1
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
