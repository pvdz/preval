# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > for_c > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = [$(1), 2, $(3)]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpArrElement = $(1);
      const tmpArrElement$1 = 2;
      const tmpArrElement$2 = $(3);
      a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpArrElement = $(1);
      const tmpArrElement$2 = $(3);
      a = [tmpArrElement, 2, tmpArrElement$2];
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 1
 - 6: 3
 - 7: 1
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same