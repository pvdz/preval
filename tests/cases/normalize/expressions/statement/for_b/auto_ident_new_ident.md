# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Statement > For b > Auto ident new ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; new $(1); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (new $(1)) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = new $(1);
while (tmpIfTest) {
  $(1);
  tmpIfTest = new $(1);
}
$(a);
`````

## Output

`````js filename=intro
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
$(1);
new $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  new $(1);
}
const a = { a: 999, b: 1000 };
$(a);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
