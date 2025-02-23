# Preval test case

# prop_no_no_no.md

> Normalize > Optional > Prop no no no
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b.c.d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a.b.c.d);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCompObj$1 = a.b;
const tmpCompObj = tmpCompObj$1.c;
const tmpCalleeParam = tmpCompObj.d;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCompObj$1 /*:unknown*/ = $Object_prototype.b;
const tmpCompObj /*:unknown*/ = tmpCompObj$1.c;
const tmpCalleeParam /*:unknown*/ = tmpCompObj.d;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b.d;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
