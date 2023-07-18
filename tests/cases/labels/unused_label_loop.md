# Preval test case

# unused_label_loop.md

> Labels > Unused label loop
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
let x = 2;
foo: while (--x) $(x);
`````

## Pre Normal

`````js filename=intro
let x = 2;
foo: while (--x) $(x);
`````

## Normalized

`````js filename=intro
let x = 2;
while (true) {
  x = x - 1;
  let tmpIfTest = x;
  if (tmpIfTest) {
    $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
