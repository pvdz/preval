# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Throw > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function f() {});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function f() {};
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const SSA_a = function f() {};
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ function f() {} ]>')

Normalized calls: Same

Final output calls: Same
