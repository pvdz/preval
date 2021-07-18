# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(1) ? (40, 50, $(60)) : $($(100)));
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
    tmpDoWhileFlag = $(1) ? (40, 50, $(60)) : $($(100));
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpDoWhileFlag = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpDoWhileFlag = $(60);
  } else {
    const tmpCalleeParam = $(100);
    tmpDoWhileFlag = $(tmpCalleeParam);
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 60
 - 4: 100
 - 5: 1
 - 6: 60
 - 7: 100
 - 8: 1
 - 9: 60
 - 10: 100
 - 11: 1
 - 12: 60
 - 13: 100
 - 14: 1
 - 15: 60
 - 16: 100
 - 17: 1
 - 18: 60
 - 19: 100
 - 20: 1
 - 21: 60
 - 22: 100
 - 23: 1
 - 24: 60
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
