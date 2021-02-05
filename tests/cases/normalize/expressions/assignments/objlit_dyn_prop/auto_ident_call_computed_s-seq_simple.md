# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_call_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = (1, 2, b)["$"](1))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
1;
2;
const tmpCallObj = b;
const tmpNestedComplexRhs = tmpCallObj['$'](1);
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpCallObj = b;
const tmpNestedComplexRhs = tmpCallObj.$(1);
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { 1: '10' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
