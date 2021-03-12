# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ [(a = !arg)]: 10 });
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ [(a = !arg)]: 10 });
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = !arg;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { [false]: 10 };
$(tmpCalleeParam);
$(false, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { false: '10' }
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
