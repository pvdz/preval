# Preval test case

# array.md

> Normalize > Call > Bad callees > Array
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
[1, 2, 3]();
$('after');
`````

## Pre Normal

`````js filename=intro
$('before');
[1, 2, 3]();
$('after');
`````

## Normalized

`````js filename=intro
$('before');
const tmpCallCallee = [1, 2, 3];
tmpCallCallee();
$('after');
`````

## Output

`````js filename=intro
$('before');
const tmpCallCallee = [1, 2, 3];
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
