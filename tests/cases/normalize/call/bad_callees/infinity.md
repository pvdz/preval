# Preval test case

# infinity.md

> Normalize > Call > Bad callees > Infinity
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
Infinity();
$('after');
`````

## Pre Normal


`````js filename=intro
$(`before`);
Infinity();
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
Infinity();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`Infinity()\``;
`````

## Output


`````js filename=intro
$(`before`);
Infinity();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`Infinity()\``;
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
Infinity.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `Infinity()`";
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
