# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (1 && $($(1)));
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
    tmpDoWhileFlag = 1 && $($(1));
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
    tmpDoWhileFlag = 1;
    if (tmpDoWhileFlag) {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(1);
      tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
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
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = true;
  const tmpCalleeParam$1 = $(1);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = true;
      const tmpCalleeParam$2 = $(1);
      tmpDoWhileFlag = $(tmpCalleeParam$2);
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
if (b) {
  $( 100 );
  b = true;
  const c = $( 1 );
  b = $( c );
  while ($LOOP_UNROLL_9) {
    if (b) {
      $( 100 );
      b = true;
      const d = $( 1 );
      b = $( d );
    }
    else {
      break;
    }
  }
}
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
