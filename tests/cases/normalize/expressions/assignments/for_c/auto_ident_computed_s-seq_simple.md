# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b)[$("c")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = (1, 2, b)[$(`c`)];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  tmpIfTest = $(1);
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { c: 1 };
while (tmpIfTest) {
  const tmpAssignRhsCompProp = $(`c`);
  a = b[tmpAssignRhsCompProp];
  tmpIfTest = $(1);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
