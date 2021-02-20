# Preval test case

# continue_with_dupe.md

> Labels > Continue with dupe
>
> Labels should not throw

The label of the continue should be updated because the duplicate labels will be renamed.

#TODO

## Input

`````js filename=intro
a: {}
a: while (true) {
  $(1);
  continue a;
}
a: {}
`````

## Normalized

`````js filename=intro
a_1: while (true) {
  $(1);
  continue a_1;
}
`````

## Output

`````js filename=intro
a_1: while (true) {
  $(1);
  continue a_1;
}
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

Normalized calls: Same

Final output calls: Same
