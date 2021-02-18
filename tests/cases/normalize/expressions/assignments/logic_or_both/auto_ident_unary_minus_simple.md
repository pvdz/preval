# Preval test case

# auto_ident_unary_minus_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_unary_minus_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = -arg) || (a = -arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = -arg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = -arg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let SSA_a = -1;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  SSA_a = -1;
  tmpCalleeParam = -1;
}
$(tmpCalleeParam);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - 2: -1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
