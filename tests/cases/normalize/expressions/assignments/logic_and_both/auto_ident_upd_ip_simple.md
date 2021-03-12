# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b++) && (a = b++));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b++) && (a = b++));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpPostUpdArgIdent = b;
b = b + 1;
a = tmpPostUpdArgIdent;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpPostUpdArgIdent$1 = b;
  b = b + 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let SSA_b = 2;
let SSA_a = 1;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpPostUpdArgIdent$1 = SSA_b;
  SSA_b = SSA_b + 1;
  SSA_a = tmpPostUpdArgIdent$1;
  tmpCalleeParam = tmpPostUpdArgIdent$1;
}
$(tmpCalleeParam);
$(SSA_a, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
