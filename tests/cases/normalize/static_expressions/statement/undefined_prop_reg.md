# Preval test case

# undefined_prop_reg.md

> Normalize > Static expressions > Statement > Undefined prop reg
>
> Property on undefined should cause the remainder to be DCE

#TODO

## Input

`````js filename=intro
$(undefined.foo);
$('fail, DCE me');
`````

## Pre Normal

`````js filename=intro
$(undefined.foo);
$('fail, DCE me');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = undefined.foo;
throw '[Preval]: Can not reach here';
`````

## Output

`````js filename=intro
undefined.foo;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
