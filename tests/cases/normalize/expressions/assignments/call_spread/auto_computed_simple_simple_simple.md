# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = { b: $(1) }));
a["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = { b: $(1) }));
a[`b`] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(...a);
a.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( ... b );
b.b = 2;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
