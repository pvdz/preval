# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > assignments > while > auto_ident_cond_simple_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = 1 ? $(2) : $($(100)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    a = $(2);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    a = $(2);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 2
 - 4: 100
 - 5: 2
 - 6: 100
 - 7: 2
 - 8: 100
 - 9: 2
 - 10: 100
 - 11: 2
 - 12: 100
 - 13: 2
 - 14: 100
 - 15: 2
 - 16: 100
 - 17: 2
 - 18: 100
 - 19: 2
 - 20: 100
 - 21: 2
 - 22: 100
 - 23: 2
 - 24: 100
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same