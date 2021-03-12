# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident unary minus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...-$(100)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...-$(100)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpArrElToSpread = -tmpUnaryArg;
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpArrElToSpread = -tmpUnaryArg;
[...tmpArrElToSpread];
$(a);
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
