# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > assignments > for_b > auto_ident_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b)).c); $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    const tmpCompObj = $(b);
    const tmpNestedComplexRhs = tmpCompObj.c;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    const tmpCompObj = $(b);
    const tmpNestedComplexRhs = tmpCompObj.c;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1
 - 3: { c: '1' }
 - 4: 1
 - 5: { c: '1' }
 - 6: 1
 - 7: { c: '1' }
 - 8: 1
 - 9: { c: '1' }
 - 10: 1
 - 11: { c: '1' }
 - 12: 1
 - 13: { c: '1' }
 - 14: 1
 - 15: { c: '1' }
 - 16: 1
 - 17: { c: '1' }
 - 18: 1
 - 19: { c: '1' }
 - 20: 1
 - 21: { c: '1' }
 - 22: 1
 - 23: { c: '1' }
 - 24: 1
 - 25: { c: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
