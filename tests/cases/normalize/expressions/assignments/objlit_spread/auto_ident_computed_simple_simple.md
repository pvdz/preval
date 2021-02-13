# Preval test case

# auto_ident_computed_simple_simple.md

> normalize > expressions > assignments > objlit_spread > auto_ident_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ ...(a = b["c"]) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b['c'];
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
a = b['c'];
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same