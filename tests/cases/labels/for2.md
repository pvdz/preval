# Preval test case

# for2.md

> Labels > For2
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

#TODO

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (0) break foo;
  else continue foo;
}
$(2);
`````

## Pre Normal

`````js filename=intro
$(0);
dropme: {
  foo: while ($(true)) {
    {
      if (0) break foo;
      else continue foo;
    }
  }
}
$(2);
`````

## Normalized

`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    continue;
  } else {
    break;
  }
}
$(2);
`````

## Output

`````js filename=intro
$(0);
let tmpIfTest = $(true);
while (tmpIfTest) {
  tmpIfTest = $(true);
}
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
