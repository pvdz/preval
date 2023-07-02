# Preval test case

# continue_loop.md

> Labels > Continue loop
>
> Labels that are direct parents of loops should not become blocks because that might break labeled continue statements

#TODO

## Input

`````js filename=intro
let fail = false;
foo: while(true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Pre Normal

`````js filename=intro
let fail = false;
foo: while (true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Normalized

`````js filename=intro
let fail = false;
while (true) {
  $(1);
  fail = true;
}
$(2);
`````

## Output

`````js filename=intro
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
$(2);
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
