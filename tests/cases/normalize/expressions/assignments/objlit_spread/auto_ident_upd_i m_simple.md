# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = b--) });
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = b--) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { ...1 };
$(tmpCalleeParam);
$(1, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
