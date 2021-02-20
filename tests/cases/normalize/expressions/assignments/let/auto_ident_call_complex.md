# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Let > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $($)(1));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
a = tmpCallCallee(1);
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee = $($);
const SSA_a = tmpCallCallee(1);
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
