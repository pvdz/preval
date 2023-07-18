# Preval test case

# null.md

> Normalize > While > Test > Null
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while (null) {
  $('loop');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while (null) {
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
