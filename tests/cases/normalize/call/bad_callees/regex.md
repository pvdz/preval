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
const tmpCallComplexCallee = /nope/;
tmpCallComplexCallee();
$(`after`);
`````

## Output


`````js filename=intro
$(`before`);
const tmpCallComplexCallee = /nope/;
tmpCallComplexCallee();
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
const a = /nope/;
a();
$( "after" );
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
