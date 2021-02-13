# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > assignments > if > auto_ident_unary_void_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
if ((a = void arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
let tmpIfTest = a;
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let tmpIfTest = a;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
