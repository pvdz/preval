# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > while > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = [$(1), 2, $(3)])) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$2 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
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
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: 1
 - 5: 3
 - 6: 100
 - 7: 1
 - 8: 3
 - 9: 100
 - 10: 1
 - 11: 3
 - 12: 100
 - 13: 1
 - 14: 3
 - 15: 100
 - 16: 1
 - 17: 3
 - 18: 100
 - 19: 1
 - 20: 3
 - 21: 100
 - 22: 1
 - 23: 3
 - 24: 100
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
