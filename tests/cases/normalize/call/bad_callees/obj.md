# Preval test case

# obj.md

> Normalize > Call > Bad callees > Obj
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
({a: 1, b: 2}());
$('after');
`````

## Pre Normal

`````js filename=intro
$('before');
({ a: 1, b: 2 }());
$('after');
`````

## Normalized

`````js filename=intro
$('before');
const tmpCallCallee = { a: 1, b: 2 };
tmpCallCallee();
$('after');
`````

## Output

`````js filename=intro
$('before');
const tmpCallCallee = { a: 1, b: 2 };
tmpCallCallee();
$('after');
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
