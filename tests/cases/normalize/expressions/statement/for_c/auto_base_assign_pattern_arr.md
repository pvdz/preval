# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > for_c > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; $(1); [b] = $([$(2)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCallCallee = $;
      const tmpArrElement = $(2);
      const tmpCalleeParam = [tmpArrElement];
      const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
      const arrPatternSplat = [...arrAssignPatternRhs];
      b = arrPatternSplat[0];
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpArrElement = $(2);
      const tmpCalleeParam = [tmpArrElement];
      const arrAssignPatternRhs = $(tmpCalleeParam);
      const arrPatternSplat = [...arrAssignPatternRhs];
      b = arrPatternSplat[0];
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: 1
 - 5: 2
 - 6: [2]
 - 7: 1
 - 8: 2
 - 9: [2]
 - 10: 1
 - 11: 2
 - 12: [2]
 - 13: 1
 - 14: 2
 - 15: [2]
 - 16: 1
 - 17: 2
 - 18: [2]
 - 19: 1
 - 20: 2
 - 21: [2]
 - 22: 1
 - 23: 2
 - 24: [2]
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same