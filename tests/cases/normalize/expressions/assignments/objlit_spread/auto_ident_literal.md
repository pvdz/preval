# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > objlit_spread > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = "foo") });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
a = 'foo';
tmpObjSpread = 'foo';
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
a = 'foo';
tmpObjSpread = 'foo';
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { 0: '"f"', 1: '"o"', 2: '"o"' }
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
