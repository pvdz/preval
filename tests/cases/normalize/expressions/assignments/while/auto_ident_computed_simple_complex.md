# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > assignments > while > auto_ident_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ((a = b[$("c")])) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 100
 - 3: 'c'
 - 4: 100
 - 5: 'c'
 - 6: 100
 - 7: 'c'
 - 8: 100
 - 9: 'c'
 - 10: 100
 - 11: 'c'
 - 12: 100
 - 13: 'c'
 - 14: 100
 - 15: 'c'
 - 16: 100
 - 17: 'c'
 - 18: 100
 - 19: 'c'
 - 20: 100
 - 21: 'c'
 - 22: 100
 - 23: 'c'
 - 24: 100
 - 25: 'c'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
