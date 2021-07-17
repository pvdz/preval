# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  tmpIfTest = $(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  tmpIfTest = $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - 4: 1
 - 5: 30
 - 6: 60
 - 7: 1
 - 8: 30
 - 9: 60
 - 10: 1
 - 11: 30
 - 12: 60
 - 13: 1
 - 14: 30
 - 15: 60
 - 16: 1
 - 17: 30
 - 18: 60
 - 19: 1
 - 20: 30
 - 21: 60
 - 22: 1
 - 23: 30
 - 24: 60
 - 25: 1
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
