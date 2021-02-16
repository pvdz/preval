# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > for_b > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete arg[$("y")]); $(1));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    a = delete tmpDeleteCompObj[tmpDeleteCompProp];
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompProp = $('y');
  a = delete arg[tmpDeleteCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 1
 - 3: 'y'
 - 4: 1
 - 5: 'y'
 - 6: 1
 - 7: 'y'
 - 8: 1
 - 9: 'y'
 - 10: 1
 - 11: 'y'
 - 12: 1
 - 13: 'y'
 - 14: 1
 - 15: 'y'
 - 16: 1
 - 17: 'y'
 - 18: 1
 - 19: 'y'
 - 20: 1
 - 21: 'y'
 - 22: 1
 - 23: 'y'
 - 24: 1
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
