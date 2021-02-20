# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = ++b) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { ...2 };
$(tmpCalleeParam);
$(2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
