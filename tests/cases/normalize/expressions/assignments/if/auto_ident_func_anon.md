# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > If > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = function () {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {};
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function () {};
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
