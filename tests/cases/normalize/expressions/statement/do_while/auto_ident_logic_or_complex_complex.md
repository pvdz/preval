# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || $($(2)));
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
    tmpDoWhileFlag = $($(0)) || $($(2));
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
      const tmpCalleeParam$1 = $(2);
      tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$1);
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
let $tmpLoopUnrollCheck = false;
if (tmpDoWhileFlag) {
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
} else {
  const tmpCalleeParam$1 = $(2);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
}
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(0);
  tmpDoWhileFlag = $(tmpCalleeParam$2);
  if (tmpDoWhileFlag) {
  } else {
    const tmpCalleeParam$4 = $(2);
    tmpDoWhileFlag = $(tmpCalleeParam$4);
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$3 = $(0);
      tmpDoWhileFlag = $(tmpCalleeParam$3);
      if (tmpDoWhileFlag) {
      } else {
        const tmpCalleeParam$5 = $(2);
        tmpDoWhileFlag = $(tmpCalleeParam$5);
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
let c = false;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
if (b) {
  $( 100 );
  const e = $( 0 );
  b = $( e );
  if (b) {

  }
  else {
    const f = $( 2 );
    b = $( f );
  }
}
if (c) {
  while ($LOOP_UNROLL_9) {
    if (b) {
      $( 100 );
      const g = $( 0 );
      b = $( g );
      if (b) {

      }
      else {
        const h = $( 2 );
        b = $( h );
      }
    }
    else {
      break;
    }
  }
}
const i = {
a: 999,
b: 1000
;
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
