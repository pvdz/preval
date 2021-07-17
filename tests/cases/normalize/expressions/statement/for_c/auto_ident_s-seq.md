# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > For c > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; $(1); $(1), $(2), x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(1), $(2), x;
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (tmpIfTest) {
  $(1);
  $(2);
  tmpIfTest = $(1);
}
$(a, x);
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
while (tmpIfTest) {
  $(1);
  $(2);
  tmpIfTest = $(1);
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
