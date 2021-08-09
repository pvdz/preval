# Preval test case

# counter_update_0.md

> Unwind loops > Counter update 0
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += 0) $(i);
`````

## Pre Normal

`````js filename=intro
const max = $(10);
{
  let i = 0;
  while (i < 10) {
    $(i);
    i += 0;
  }
}
`````

## Normalized

`````js filename=intro
const max = $(10);
let i = 0;
let tmpIfTest = i < 10;
while (tmpIfTest) {
  $(i);
  i = i + 0;
  tmpIfTest = i < 10;
}
`````

## Output

`````js filename=intro
$(10);
let i = 0;
let tmpIfTest = true;
while (tmpIfTest) {
  $(i);
  i = i + 0;
  tmpIfTest = i < 10;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 0
 - 6: 0
 - 7: 0
 - 8: 0
 - 9: 0
 - 10: 0
 - 11: 0
 - 12: 0
 - 13: 0
 - 14: 0
 - 15: 0
 - 16: 0
 - 17: 0
 - 18: 0
 - 19: 0
 - 20: 0
 - 21: 0
 - 22: 0
 - 23: 0
 - 24: 0
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same