# Preval test case

# zero.md

> Normalize > While > Test > Zero
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while (0) {
  $('loop');
}
$('after');
`````

## Pre Normal


`````js filename=intro
while (0) {
  $(`loop`);
}
$(`after`);
`````

## Normalized


`````js filename=intro
$(`after`);
`````

## Output


`````js filename=intro
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
