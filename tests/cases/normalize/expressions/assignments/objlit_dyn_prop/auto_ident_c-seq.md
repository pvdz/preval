# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ [(a = ($(1), $(2), $(x)))]: 10 });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
$(1);
$(2);
const tmpNestedComplexRhs = $(x);
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
$(1);
$(2);
const tmpNestedComplexRhs = $(1);
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { 1: '10' }
 - 5: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
