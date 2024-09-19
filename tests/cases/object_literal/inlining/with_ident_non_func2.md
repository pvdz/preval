# Preval test case

# with_ident_non_func2.md

> Object literal > Inlining > With ident non func2
>
>

## Input

`````js filename=intro
let g = /regex/;
const obj = {f: g};
$(obj.f);
`````

## Pre Normal


`````js filename=intro
let g = /regex/;
const obj = { f: g };
$(obj.f);
`````

## Normalized


`````js filename=intro
let g = /regex/;
const obj = { f: g };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const g /*:regex*/ = /regex/;
$(g);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /regex/;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
