# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = "foo")]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
a = 'foo';
tmpObjLitPropKey = 'foo';
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjLitPropKey;
a = 'foo';
tmpObjLitPropKey = 'foo';
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { foo: '10' }
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
