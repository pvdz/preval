# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = !$(100))]);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = !$(100))]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
const tmpCalleeParam = [...a];
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
const c = [ ... b ];
$( c );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
