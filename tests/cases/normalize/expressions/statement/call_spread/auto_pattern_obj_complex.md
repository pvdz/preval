# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Call spread > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(...$({ a: 1, b: 2 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(...$({ a: 1, b: 2 }));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCalleeParamSpread = $(tmpCalleeParam);
$(...tmpCalleeParamSpread);
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 1,
b: 2
;
const b = $( a );
$( ... b );
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
