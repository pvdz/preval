# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_delete_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = delete ($(1), $(2), $(arg))[$("y")])]: 10 });
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpObjLitPropKey = a;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: { true: '10' }
 - 6: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same