# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > assignments > while > auto_ident_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))[$("c")])) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCompObj = $(b);
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
  const tmpCompObj = $(b);
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
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 100
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 100
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 100
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 100
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 100
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 100
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 100
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 100
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
