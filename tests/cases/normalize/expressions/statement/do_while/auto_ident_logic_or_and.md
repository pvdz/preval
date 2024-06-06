# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(0)) || ($($(1)) && $($(2)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
      if (tmpIfTest) {
      } else {
        break;
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpCalleeParam = $(0);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      $tmpLoopUnrollCheck = false;
    }
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$2 = $(0);
    const tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$4 = $(1);
      const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$4);
      if (tmpClusterSSA_tmpIfTest$2) {
        const tmpCalleeParam$6 = $(2);
        const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$6);
        if (tmpClusterSSA_tmpIfTest$4) {
        } else {
          break;
        }
      } else {
        break;
      }
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
let a = true;
$( 100 );
const b = $( 0 );
const c = $( b );
if (c) {

}
else {
  const d = $( 1 );
  const e = $( d );
  if (e) {
    const f = $( 2 );
    const g = $( f );
    if (g) {

    }
    else {
      a = false;
    }
  }
  else {
    a = false;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( 0 );
    const i = $( h );
    if (i) {

    }
    else {
      const j = $( 1 );
      const k = $( j );
      if (k) {
        const l = $( 2 );
        const m = $( l );
        if (m) {

        }
        else {
          break;
        }
      }
      else {
        break;
      }
    }
  }
}
const n = {
a: 999,
b: 1000
;
$( n );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
