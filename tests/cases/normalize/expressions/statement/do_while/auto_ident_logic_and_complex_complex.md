# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(2)));
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
    tmpDoWhileFlag = $($(1)) && $($(2));
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
    const tmpCalleeParam = $(1);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    if (tmpDoWhileFlag) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$1);
    } else {
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
const tmpCalleeParam = $(1);
let tmpDoWhileFlag = $(tmpCalleeParam);
let $tmpLoopUnrollCheck = false;
if (tmpDoWhileFlag) {
  const tmpCalleeParam$1 = $(2);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
} else {
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
}
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(1);
  tmpDoWhileFlag = $(tmpCalleeParam$2);
  if (tmpDoWhileFlag) {
    const tmpCalleeParam$4 = $(2);
    tmpDoWhileFlag = $(tmpCalleeParam$4);
  } else {
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$3 = $(1);
      tmpDoWhileFlag = $(tmpCalleeParam$3);
      if (tmpDoWhileFlag) {
        const tmpCalleeParam$5 = $(2);
        tmpDoWhileFlag = $(tmpCalleeParam$5);
      } else {
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
const a = $( 1 );
let b = $( a );
let c = false;
if (b) {
  const d = $( 2 );
  b = $( d );
  c = b;
}
else {
  c = b;
}
if (b) {
  $( 100 );
  const e = $( 1 );
  b = $( e );
  if (b) {
    const f = $( 2 );
    b = $( f );
  }
}
if (c) {
  while ($LOOP_UNROLL_9) {
    if (b) {
      $( 100 );
      const g = $( 1 );
      b = $( g );
      if (b) {
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
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
