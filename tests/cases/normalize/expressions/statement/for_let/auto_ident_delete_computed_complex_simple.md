# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > for_let > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = delete $(x)["y"]; ; $(1)) $(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: 1
 - 4: true
 - 5: 1
 - 6: true
 - 7: 1
 - 8: true
 - 9: 1
 - 10: true
 - 11: 1
 - 12: true
 - 13: 1
 - 14: true
 - 15: 1
 - 16: true
 - 17: 1
 - 18: true
 - 19: 1
 - 20: true
 - 21: 1
 - 22: true
 - 23: 1
 - 24: true
 - 25: 1
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
