# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_unary_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ [(a = typeof $(x))]: 10 });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpUnaryArg = $(x);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpUnaryArg = $(1);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { number: '10' }
 - 3: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
