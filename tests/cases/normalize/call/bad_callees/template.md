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
$(`before`);
(`` + String($) + ``)();
$(`after`);
`````

## Normalized

`````js filename=intro
$(`before`);
const tmpBinBothLhs = ``;
const tmpBinBothRhs = String($);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCallComplexCallee = tmpBinLhs + ``;
tmpCallComplexCallee();
$(`after`);
`````

## Output

`````js filename=intro
$(`before`);
const tmpBinBothRhs = String($);
tmpBinBothRhs();
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
