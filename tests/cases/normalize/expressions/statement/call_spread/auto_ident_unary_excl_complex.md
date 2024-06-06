# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...!$(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...!$(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
const tmpCalleeParamSpread = !tmpUnaryArg;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpCalleeParamSpread = !tmpUnaryArg;
$(...tmpCalleeParamSpread);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 100 );
const c = !b;
$( ... c );
$( a );
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
