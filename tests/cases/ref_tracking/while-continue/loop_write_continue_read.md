# Preval test case

# loop_write_continue_read.md

> Ref tracking > While-continue > Loop write continue read
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x, 1);
  if (x < 4) continue;
  $(x, 2);
  break;
}
`````

## Pre Normal

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x, 1);
  if (x < 4) continue;
  $(x, 2);
  break;
}
`````

## Normalized

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x, 1);
  const tmpIfTest = x < 4;
  if (tmpIfTest) {
    continue;
  } else {
    $(x, 2);
    break;
  }
}
`````

## Output

`````js filename=intro
$(1, 1);
$(2, 1);
$(3, 1);
$(4, 1);
$(4, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 1 );
$( 2, 1 );
$( 3, 1 );
$( 4, 1 );
$( 4, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - 2: 2, 1
 - 3: 3, 1
 - 4: 4, 1
 - 5: 4, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
