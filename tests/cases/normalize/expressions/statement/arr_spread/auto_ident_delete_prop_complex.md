# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
[...delete $(arg).y];
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
[...delete $(arg).y];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpArrElToSpread = delete tmpDeleteObj.y;
[...tmpArrElToSpread];
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpArrElToSpread = delete tmpDeleteObj.y;
[...tmpArrElToSpread];
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
