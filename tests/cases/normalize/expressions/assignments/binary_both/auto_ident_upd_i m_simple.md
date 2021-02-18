# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b--) + (a = b--));
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
let tmpBinBothLhs = a;
const tmpPostUpdArgIdent$1 = b;
b = b - 1;
a = tmpPostUpdArgIdent$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
$(1);
$(0, -1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
