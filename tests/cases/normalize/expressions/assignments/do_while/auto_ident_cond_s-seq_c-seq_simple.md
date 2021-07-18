# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))));
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
    tmpDoWhileFlag = a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest = 30;
  if (tmpIfTest) {
    tmpNestedComplexRhs = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpNestedComplexRhs = $(60);
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
