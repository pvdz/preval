# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = void arg);
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
let xyz = a;
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
$(undefined);
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
