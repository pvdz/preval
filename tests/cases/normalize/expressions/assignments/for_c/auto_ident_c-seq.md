# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > for_c > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = ($(1), $(2), $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      $(1);
      $(2);
      a = $(x);
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
    $(2);
    a = $(1);
  } else {
    break;
  }
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
