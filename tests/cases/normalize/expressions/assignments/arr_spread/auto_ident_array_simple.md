# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = [1, 2, 3])]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = [1, 2, 3])]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = [1, 2, 3];
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = [1, 2, 3];
const tmpCalleeParam = [...a];
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = [ ... a ];
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
