# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > assignments > for_b > auto_ident_delete_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete ($(1), $(2), $(x))[$("y")]); $(1));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    $(1);
    $(2);
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 'y'
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: {}
 - 14: 'y'
 - 15: 1
 - 16: 1
 - 17: 2
 - 18: {}
 - 19: 'y'
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 'y'
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
