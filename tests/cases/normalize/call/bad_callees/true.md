# Preval test case

# true.md

> Normalize > Call > Bad callees > True
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
true();
$('after');
`````

## Pre Normal


`````js filename=intro
$(`before`);
true();
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
true();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`true()\``;
`````

## Output


`````js filename=intro
$(`before`);
true();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`true()\``;
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
true.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `true()`";
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
