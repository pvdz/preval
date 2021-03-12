# Preval test case

# continue_outer_loop.md

> Labels > Continue outer loop
>
> A continue may not reference its current loop

#TODO

## Input

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````

## Pre Normal

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````

## Normalized

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````

## Output

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
