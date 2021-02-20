# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) && (a = b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
b = 2;
a = 2;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  b = 2;
  let tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let SSA_b = 2;
let SSA_a = 2;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  SSA_b = 2;
  const tmpNestedComplexRhs = SSA_b;
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a, SSA_b, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
