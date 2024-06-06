# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || ($($(1)) && $($(2))))) {
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
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
    } else {
    }
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  } else {
  }
  if (a) {
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$2 = $(0);
    const tmpClusterSSA_a = $(tmpCalleeParam$2);
    if (tmpClusterSSA_a) {
    } else {
      const tmpCalleeParam$4 = $(1);
      a = $(tmpCalleeParam$4);
      if (a) {
        const tmpCalleeParam$6 = $(2);
        a = $(tmpCalleeParam$6);
        if (a) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = $( 0 );
let c = $( b );
if (c) {

}
else {
  const d = $( 1 );
  c = $( d );
  if (c) {
    const e = $( 2 );
    c = $( e );
  }
  if (c) {

  }
  else {
    a = false;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( 0 );
    const g = $( f );
    if (g) {

    }
    else {
      const h = $( 1 );
      c = $( h );
      if (c) {
        const i = $( 2 );
        c = $( i );
        if (c) {

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
$( c );
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
