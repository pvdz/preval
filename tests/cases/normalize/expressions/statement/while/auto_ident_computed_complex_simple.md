# Preval test case

# auto_ident_computed_complex_simple.md

> normalize > expressions > statement > while > auto_ident_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ($(b)["c"]) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpIfTest = tmpCompObj.c;
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
  const tmpCompObj = $(b);
  const tmpIfTest = tmpCompObj.c;
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
 - 2: 100
 - 3: { c: '1' }
 - 4: 100
 - 5: { c: '1' }
 - 6: 100
 - 7: { c: '1' }
 - 8: 100
 - 9: { c: '1' }
 - 10: 100
 - 11: { c: '1' }
 - 12: 100
 - 13: { c: '1' }
 - 14: 100
 - 15: { c: '1' }
 - 16: 100
 - 17: { c: '1' }
 - 18: 100
 - 19: { c: '1' }
 - 20: 100
 - 21: { c: '1' }
 - 22: 100
 - 23: { c: '1' }
 - 24: 100
 - 25: { c: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
