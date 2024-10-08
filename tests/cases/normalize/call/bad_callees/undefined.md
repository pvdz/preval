# Preval test case

# undefined.md

> Normalize > Call > Bad callees > Undefined
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
undefined();
$('after');
`````

## Pre Normal


`````js filename=intro
$(`before`);
undefined();
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
undefined();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`undefined()\``;
`````

## Output


`````js filename=intro
$(`before`);
undefined();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`undefined()\``;
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
undefined.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `undefined()`";
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
