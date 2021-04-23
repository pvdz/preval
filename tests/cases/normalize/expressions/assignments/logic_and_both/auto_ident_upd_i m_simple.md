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
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
$(0);
$(0, -1);
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
