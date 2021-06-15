# Preval test case

# regex.md

> Normalize > Call > Bad callees > Regex
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
/nope/();
$('after');
`````

## Pre Normal

`````js filename=intro
$(`before`);
/nope/();
$(`after`);
`````

## Normalized

`````js filename=intro
$(`before`);
const tmpCallCallee = /nope/;
tmpCallCallee();
$(`after`);
`````

## Output

`````js filename=intro
$(`before`);
const tmpCallCallee = /nope/;
tmpCallCallee();
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
