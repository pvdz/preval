# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_unary_typeof_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ [(a = typeof $(arg))]: 10 });
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpObjLitPropKey = a;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { number: '10' }
 - 3: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
