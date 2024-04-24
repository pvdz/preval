# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = 1 ? (40, 50, $(60)) : $($(100))));
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
    tmpDoWhileFlag = a = 1 ? (40, 50, $(60)) : $($(100));
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
    let tmpNestedComplexRhs = undefined;
    tmpNestedComplexRhs = $(60);
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpNestedComplexRhs = $(60);
let a = tmpNestedComplexRhs;
let tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpNestedComplexRhs$1 = $(60);
  a = tmpNestedComplexRhs$1;
  tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpNestedComplexRhs$2 = $(60);
      a = tmpNestedComplexRhs$2;
      tmpDoWhileFlag = tmpNestedComplexRhs$2;
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
$( 100 );
const a = $( 60 );
let b = a;
let c = a;
if (a) {
  $( 100 );
  const d = $( 60 );
  b = d;
  c = d;
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( 100 );
      const e = $( 60 );
      b = e;
      c = e;
    }
    else {
      break;
    }
  }
}
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
