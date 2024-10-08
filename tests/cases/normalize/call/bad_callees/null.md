# Preval test case

# null.md

> Normalize > Call > Bad callees > Null
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
null();
$('after');
`````

## Pre Normal


`````js filename=intro
$(`before`);
null();
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
null();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`null()\``;
`````

## Output


`````js filename=intro
$(`before`);
null();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`null()\``;
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
null.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `null()`";
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
