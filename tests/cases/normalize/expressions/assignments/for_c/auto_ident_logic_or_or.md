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
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    a = tmpCallCallee(tmpCalleeParam);
    if (a) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      a = tmpCallCallee$1(tmpCalleeParam$1);
      if (a) {
      } else {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        a = tmpCallCallee$3(tmpCalleeParam$3);
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
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_a = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a) {
    } else {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    }
  }
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpCalleeParam$2 = $(0);
      a = $(tmpCalleeParam$2);
      if (a) {
      } else {
        const tmpCalleeParam$4 = $(1);
        const tmpClusterSSA_a$1 = $(tmpCalleeParam$4);
        if (tmpClusterSSA_a$1) {
        } else {
          const tmpCalleeParam$6 = $(2);
          $(tmpCalleeParam$6);
        }
      }
      tmpClusterSSA_tmpIfTest = $(1);
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
  let g = $( 1 );
  while ($LOOP_UNROLL_10) {
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
      g = $( 1 );
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
