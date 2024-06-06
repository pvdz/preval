# Preval test case

# null_prop_reg.md

> Normalize > Static expressions > Statement > Null prop reg
>
> Property on null should cause the remainder to be DCE

#TODO

## Input

`````js filename=intro
$(null.foo);
$('fail, DCE me');
`````

## Pre Normal


`````js filename=intro
$(null.foo);
$(`fail, DCE me`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = null.foo;
throw `[Preval]: Can not reach here`;
`````

## Output


`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
null.foo;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
