# Preval test case

# obj.md

> Builtins cases > EncodeURIComponent > Obj
>
>

## Input

`````js filename=intro
$(encodeURIComponent({wat: true}));
`````

## Pre Normal


`````js filename=intro
$(encodeURIComponent({ wat: true }));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallCallee$1 = encodeURIComponent;
const tmpCalleeParam$1 = { wat: true };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { wat: true };
const tmpCalleeParam /*:string*/ = encodeURIComponent(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { wat: true };
const b = encodeURIComponent( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '%5Bobject%20Object%5D'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
