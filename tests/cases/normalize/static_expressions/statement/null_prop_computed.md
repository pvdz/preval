# Preval test case

# null_prop_computed.md

> Normalize > Static expressions > Statement > Null prop computed
>
> Property on null should cause the remainder to be DCE

The computed value is not DCE but the actual usage should be removed because it doesn't matter what property attempts the access.

## Input

`````js filename=intro
$(null[$('keep me')]);
$('fail, DCE me');
`````

## Pre Normal


`````js filename=intro
$(null[$(`keep me`)]);
$(`fail, DCE me`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
$(`keep me`);
const tmpCalleeParam = null.eliminatedComputedProp;
throw `[Preval]: Can not reach here`;
`````

## Output


`````js filename=intro
$(`keep me`);
null.eliminatedComputedProp;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
$( "keep me" );
null.eliminatedComputedProp;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'keep me'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
