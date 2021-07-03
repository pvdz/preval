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
(`` + $coerce($, `string`) + ``)();
$(`after`);
`````

## Normalized

`````js filename=intro
$(`before`);
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce($, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCallComplexCallee = $coerce(tmpBinLhs, `plustr`);
tmpCallComplexCallee();
$(`after`);
`````

## Output

`````js filename=intro
$(`before`);
const tmpBinBothRhs = $coerce($, `string`);
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
