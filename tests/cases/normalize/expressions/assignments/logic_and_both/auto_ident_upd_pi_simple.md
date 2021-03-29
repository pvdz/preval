# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = ++b) && (a = ++b));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = ++b) && (a = ++b));
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  b = b + 1;
  let tmpNestedComplexRhs$1 = b;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let tmpSSA_b = 2;
let tmpSSA_a = 2;
let tmpCalleeParam = tmpSSA_a;
if (tmpCalleeParam) {
  tmpSSA_b = tmpSSA_b + 1;
  const tmpNestedComplexRhs$1 = tmpSSA_b;
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
$(tmpCalleeParam);
$(tmpSSA_a, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
