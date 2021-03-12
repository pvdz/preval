# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident cond simple simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? 2 : $($(100))) || (a = 1 ? 2 : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? 2 : $($(100))) || (a = 1 ? 2 : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 2;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  tmpNestedComplexRhs = 2;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 2;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  SSA_a = 2;
  tmpCalleeParam = 2;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
