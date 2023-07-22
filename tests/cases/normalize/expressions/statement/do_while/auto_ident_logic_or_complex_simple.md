# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || 2);
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
    tmpDoWhileFlag = $($(0)) || 2;
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
      tmpDoWhileFlag = 2;
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
  tmpDoWhileFlag = true;
}
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$1 = $(0);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  if (tmpDoWhileFlag) {
  } else {
    tmpDoWhileFlag = true;
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(0);
      tmpDoWhileFlag = $(tmpCalleeParam$2);
      if (tmpDoWhileFlag) {
      } else {
        tmpDoWhileFlag = true;
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
  b = true;
}
let c = true;
if (b) {
  $( 100 );
  const d = $( 0 );
  b = $( d );
  if (b) {

  }
  else {
    b = true;
  }
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_9) {
    if (b) {
      $( 100 );
      const e = $( 0 );
      b = $( e );
      if (b) {

      }
      else {
        b = true;
      }
    }
    else {
      break;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
