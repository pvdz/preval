# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b--) && (a = b--));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b--) && (a = b--));
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpPostUpdArgIdent$1 = b;
  b = b - 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let tmpSSA_b = 0;
let tmpSSA_a = 1;
let tmpCalleeParam = tmpSSA_a;
if (tmpCalleeParam) {
  const tmpPostUpdArgIdent$1 = tmpSSA_b;
  tmpSSA_b = tmpSSA_b - 1;
  tmpSSA_a = tmpPostUpdArgIdent$1;
  tmpCalleeParam = tmpPostUpdArgIdent$1;
}
$(tmpCalleeParam);
$(tmpSSA_a, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
