# Preval test case

# template.md

> Normalize > Call > Bad callees > Template
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
`${$}`();
$('after');
`````

## Pre Normal

`````js filename=intro
$('before');
('' + $ + '')();
$('after');
`````

## Normalized

`````js filename=intro
$('before');
const tmpBinLhs = '' + $;
const tmpCallCallee = tmpBinLhs + '';
tmpCallCallee();
$('after');
`````

## Output

`````js filename=intro
$('before');
const tmpBinLhs = '' + $;
tmpBinLhs();
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
