# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > statement > do_while > auto_ident_delete_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), x)[$("y")]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    $(1);
    $(2);
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    $(1);
    $(2);
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 'y'
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 'y'
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 'y'
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 'y'
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
