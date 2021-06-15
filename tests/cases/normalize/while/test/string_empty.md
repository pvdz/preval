# Preval test case

# string_empty.md

> Normalize > While > Test > String empty
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ('') {
  $('loop');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while (``) {
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
