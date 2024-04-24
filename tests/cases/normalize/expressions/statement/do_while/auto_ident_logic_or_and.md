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
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $($(0)) || ($($(1)) && $($(2)));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    if (tmpDoWhileFlag) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpDoWhileFlag) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpDoWhileFlag = tmpCallCallee$3(tmpCalleeParam$3);
      } else {
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
$(100);
const tmpCalleeParam = $(0);
let tmpDoWhileFlag = $(tmpCalleeParam);
if (tmpDoWhileFlag) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  if (tmpDoWhileFlag) {
    const tmpCalleeParam$3 = $(2);
    tmpDoWhileFlag = $(tmpCalleeParam$3);
  } else {
  }
}
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(0);
  tmpDoWhileFlag = $(tmpCalleeParam$2);
  if (tmpDoWhileFlag) {
  } else {
    const tmpCalleeParam$4 = $(1);
    tmpDoWhileFlag = $(tmpCalleeParam$4);
    if (tmpDoWhileFlag) {
      const tmpCalleeParam$6 = $(2);
      tmpDoWhileFlag = $(tmpCalleeParam$6);
    } else {
    }
  }
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$5 = $(0);
      tmpDoWhileFlag = $(tmpCalleeParam$5);
      if (tmpDoWhileFlag) {
      } else {
        const tmpCalleeParam$7 = $(1);
        tmpDoWhileFlag = $(tmpCalleeParam$7);
        if (tmpDoWhileFlag) {
          const tmpCalleeParam$9 = $(2);
          tmpDoWhileFlag = $(tmpCalleeParam$9);
        } else {
        }
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
$( 100 );
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
if (b) {
  $( 100 );
  const e = $( 0 );
  b = $( e );
  if (b) {

  }
  else {
    const f = $( 1 );
    b = $( f );
    if (b) {
      const g = $( 2 );
      b = $( g );
    }
  }
  while ($LOOP_UNROLL_9) {
    if (b) {
      $( 100 );
      const h = $( 0 );
      b = $( h );
      if (b) {

      }
      else {
        const i = $( 1 );
        b = $( i );
        if (b) {
          const j = $( 2 );
          b = $( j );
        }
      }
    }
    else {
      break;
    }
  }
}
const k = {
a: 999,
b: 1000
;
$( k );
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
