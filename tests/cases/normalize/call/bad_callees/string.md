# Preval test case

# string.md

> Normalize > Call > Bad callees > String
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
"maybe"();
$('after');
`````

## Pre Normal

`````js filename=intro
$('before');
'maybe'();
$('after');
`````

## Normalized

`````js filename=intro
$('before');
'maybe'();
throw '[Preval]: Call expression with illegal callee must crash before this line ';
`````

## Output

`````js filename=intro
$('before');
'maybe'();
throw '[Preval]: Call expression with illegal callee must crash before this line ';
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
