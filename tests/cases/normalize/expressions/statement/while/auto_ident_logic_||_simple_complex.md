# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > While > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (0 || $($(1))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while (0 || $($(1))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = 0;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = 0;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam = $(1);
    tmpIfTest = $(tmpCalleeParam);
  }
  if (tmpIfTest) {
    $(100);
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
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
