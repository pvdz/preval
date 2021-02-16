# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > statement > for_c > auto_ident_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); b[$("c")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCompProp = $('c');
    tmpCompObj[tmpCompProp];
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompProp = $('c');
    b[tmpCompProp];
  } else {
    break;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: 1
 - 4: 'c'
 - 5: 1
 - 6: 'c'
 - 7: 1
 - 8: 'c'
 - 9: 1
 - 10: 'c'
 - 11: 1
 - 12: 'c'
 - 13: 1
 - 14: 'c'
 - 15: 1
 - 16: 'c'
 - 17: 1
 - 18: 'c'
 - 19: 1
 - 20: 'c'
 - 21: 1
 - 22: 'c'
 - 23: 1
 - 24: 'c'
 - 25: 1
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
