# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Assignments > For a > Auto ident new ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (a = new $(1); ; $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = new $(1);
  while (true) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $(1);
while (true) {
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = new $(1);
while (true) {
  $(1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
