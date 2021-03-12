# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $(1) ? (40, 50, $(60)) : $($(100))); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $(1) ? (40, 50, $(60)) : $($(100)))) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 1
 - 4: 1
 - 5: 60
 - 6: 1
 - 7: 1
 - 8: 60
 - 9: 1
 - 10: 1
 - 11: 60
 - 12: 1
 - 13: 1
 - 14: 60
 - 15: 1
 - 16: 1
 - 17: 60
 - 18: 1
 - 19: 1
 - 20: 60
 - 21: 1
 - 22: 1
 - 23: 60
 - 24: 1
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
