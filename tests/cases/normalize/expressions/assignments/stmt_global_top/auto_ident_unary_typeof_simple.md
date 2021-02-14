# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > assignments > stmt_global_top > auto_ident_unary_typeof_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
a = typeof arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = typeof arg;
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = typeof 1;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
