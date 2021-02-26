# Preval test case

# var_body3.md

> Normalize > While > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
while ($(true)) var x;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(x);
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
