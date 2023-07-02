# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > For let > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let xyz = --b; ; $(1)) $(xyz);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let xyz = --b;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let xyz = b;
while (true) {
  $(xyz);
  $(1);
}
$(a, b);
`````

## Output

`````js filename=intro
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
$(0);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(0);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 0
 - 4: 1
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 1
 - 9: 0
 - 10: 1
 - 11: 0
 - 12: 1
 - 13: 0
 - 14: 1
 - 15: 0
 - 16: 1
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 1
 - 21: 0
 - 22: 1
 - 23: 0
 - 24: 1
 - 25: 0
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
