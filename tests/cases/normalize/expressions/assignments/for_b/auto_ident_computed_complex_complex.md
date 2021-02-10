# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > assignments > for_b > auto_ident_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)[$("c")]); $(1));
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
    const tmpCompProp = $('c');
    const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 1
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 1
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 1
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 1
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 1
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 1
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 1
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
