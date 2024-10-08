# Preval test case

# shift_catch.md

> Arr mutation > Shift catch
>
> Serializing an array with elided positions

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
const blob /*:array*/ = [1, 2, 3];
$(`after`, blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( "after", a );
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
