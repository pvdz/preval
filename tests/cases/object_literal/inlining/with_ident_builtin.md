# Preval test case

# with_ident_builtin.md

> Object literal > Inlining > With ident builtin
>
>

## Input

`````js filename=intro
const obj = {f: Array};
$(obj.f);
`````

## Pre Normal


`````js filename=intro
const obj = { f: Array };
$(obj.f);
`````

## Normalized


`````js filename=intro
const obj = { f: Array };
const tmpCalleeParam = obj.f;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(Array);
`````

## PST Output

With rename=true

`````js filename=intro
$( Array );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
