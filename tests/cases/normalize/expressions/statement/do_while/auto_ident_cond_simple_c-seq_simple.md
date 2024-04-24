# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond simple c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (1 ? (40, 50, $(60)) : $($(100)));
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
    tmpDoWhileFlag = 1 ? (40, 50, $(60)) : $($(100));
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
    tmpDoWhileFlag = $(60);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
let tmpDoWhileFlag = $(60);
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = $(60);
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = $(60);
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
let a = $( 60 );
if (a) {
  $( 100 );
  a = $( 60 );
  while ($LOOP_UNROLL_9) {
    if (a) {
      $( 100 );
      a = $( 60 );
    }
    else {
      break;
    }
  }
}
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 60
 - 3: 100
 - 4: 60
 - 5: 100
 - 6: 60
 - 7: 100
 - 8: 60
 - 9: 100
 - 10: 60
 - 11: 100
 - 12: 60
 - 13: 100
 - 14: 60
 - 15: 100
 - 16: 60
 - 17: 100
 - 18: 60
 - 19: 100
 - 20: 60
 - 21: 100
 - 22: 60
 - 23: 100
 - 24: 60
 - 25: 100
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
