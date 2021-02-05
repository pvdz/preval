# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > for_c > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); delete $(x)[$("y")]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpDeleteCompObj = $(x);
      const tmpDeleteCompProp = $('y');
      delete tmpDeleteCompObj[tmpDeleteCompProp];
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    delete tmpDeleteCompObj[tmpDeleteCompProp];
  } else {
    break;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 1
 - 5: {}
 - 6: 'y'
 - 7: 1
 - 8: {}
 - 9: 'y'
 - 10: 1
 - 11: {}
 - 12: 'y'
 - 13: 1
 - 14: {}
 - 15: 'y'
 - 16: 1
 - 17: {}
 - 18: 'y'
 - 19: 1
 - 20: {}
 - 21: 'y'
 - 22: 1
 - 23: {}
 - 24: 'y'
 - 25: 1
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
