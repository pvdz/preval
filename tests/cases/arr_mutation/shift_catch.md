# Preval test case

# shift_catch.md

> Arr mutation > Shift catch
>
> Serializing an array with elided positions

#TODO

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
} catch (e) {
  $('catch', blob.shift());
}
$('after', blob)
`````

## Pre Normal

`````js filename=intro
const blob = [1, 2, 3];
try {
} catch (e) {
  $(`catch`, blob.shift());
}
$(`after`, blob);
`````

## Normalized

`````js filename=intro
const blob = [1, 2, 3];
$(`after`, blob);
`````

## Output

`````js filename=intro
const blob = [1, 2, 3];
$(`after`, blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'after', [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
