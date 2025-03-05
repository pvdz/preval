# Preval test case

# with_ident_non_reachable.md

> Object literal > Inlining > With ident non reachable
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
const tmpCalleeParam = obj.f;
$(tmpCalleeParam);
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
