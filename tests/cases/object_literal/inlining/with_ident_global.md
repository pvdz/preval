# Preval test case

# with_ident_global.md

> Object literal > Inlining > With ident global
>
>

## Input

`````js filename=intro
const obj = {f: wat};
$(obj.f);
`````

## Pre Normal


`````js filename=intro
const obj = { f: wat };
$(obj.f);
`````

## Normalized


`````js filename=intro
const obj = { f: wat };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = wat;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = wat;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

wat

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
