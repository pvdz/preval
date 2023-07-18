# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = b) });
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = b) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = {};
$(tmpCalleeParam);
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
$( a );
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
