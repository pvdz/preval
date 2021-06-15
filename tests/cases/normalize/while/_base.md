# Preval test case

# _base.md

> Normalize > While > Base
>
> A while is a while

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
while (x) {
  $(`inside`);
  x = false;
}
$(1);
`````

## Output

`````js filename=intro
let x = true;
while (x) {
  $(`inside`);
  x = false;
}
$(1);
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
