# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > assignments > while > auto_ident_logic_or_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(1)) || $($(2)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 0
 - 7: 0
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: 0
 - 22: 0
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
