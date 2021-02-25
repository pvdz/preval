# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Let > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = function f() {});
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function f() {};
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function f() {};
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
