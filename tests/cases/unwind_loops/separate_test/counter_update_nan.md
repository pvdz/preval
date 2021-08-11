# Preval test case

# counter_update_nan.md

> Unwind loops > Separate test > Counter update nan
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += NaN) $(i);
`````

## Pre Normal

`````js filename=intro
const max = $(10);
{
  let i = 0;
  while (i < 10) {
    $(i);
    i += NaN;
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
  i = i + NaN;
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
  i = i + NaN;
  tmpIfTest = i < 10;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
