# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident unary plus simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
[...+arg];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpArrElToSpread = +arg;
[...tmpArrElToSpread];
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
[...+1];
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
