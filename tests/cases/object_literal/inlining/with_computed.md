# Preval test case

# with_computed.md

> Object literal > Inlining > With computed
>
>

## Input

`````js filename=intro
const key = $('dakey');
const obj = {[key]: 1};
$(obj.dakey);
`````

## Pre Normal


`````js filename=intro
const key = $(`dakey`);
const obj = { [key]: 1 };
$(obj.dakey);
`````

## Normalized


`````js filename=intro
const key = $(`dakey`);
const obj = { [key]: 1 };
const tmpCalleeParam = obj.dakey;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const key /*:unknown*/ = $(`dakey`);
const obj /*:object*/ = { [key]: 1 };
const tmpCalleeParam /*:unknown*/ = obj.dakey;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "dakey" );
const b = { [ a ]: 1 };
const c = b.dakey;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'dakey'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
