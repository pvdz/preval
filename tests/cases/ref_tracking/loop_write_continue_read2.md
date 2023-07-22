# Preval test case

# loop_write_continue_read2.md

> Ref tracking > Loop write continue read2
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  if (x < 400) continue;
  $(x);
  break;
}
`````

## Pre Normal

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  if (x < 400) continue;
  $(x);
  break;
}
`````

## Normalized

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  const tmpIfTest = x < 400;
  if (tmpIfTest) {
    continue;
  } else {
    $(x);
    break;
  }
}
`````

## Output

`````js filename=intro
let x = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  x = x + 1;
  const tmpIfTest$1 = x < 400;
  if (tmpIfTest$1) {
  } else {
    $(x);
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = a + 1;
  const b = a < 400;
  if (b) {

  }
  else {
    $( a );
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 400
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
