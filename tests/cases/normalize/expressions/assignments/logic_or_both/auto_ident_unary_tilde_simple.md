# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = ~arg) || (a = ~arg));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = ~arg) || (a = ~arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = ~arg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = ~arg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let tmpSSA_a = -2;
let tmpCalleeParam = tmpSSA_a;
if (tmpCalleeParam) {
} else {
  tmpSSA_a = -2;
  tmpCalleeParam = -2;
}
$(tmpCalleeParam);
$(tmpSSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - 2: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
