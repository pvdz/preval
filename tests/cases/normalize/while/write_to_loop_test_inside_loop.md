# Preval test case

# write_to_loop_test_inside_loop.md

> Normalize > While > Write to loop test inside loop
>
> The inner assign should not be eliminated since the loop condition uses it

#TODO

## Input

`````js filename=intro
let x = true;
while (x) {
  $('inside');
  x = false;
}
$(1);
`````

## Pre Normal

`````js filename=intro
let x = true;
while (x) {
  $(`inside`);
  x = false;
}
$(1);
`````

## Normalized

`````js filename=intro
let x = true;
while (true) {
  if (x) {
    $(`inside`);
    x = false;
  } else {
    break;
  }
}
$(1);
`````

## Output

`````js filename=intro
$(`inside`);
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( "inside" );
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inside'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
