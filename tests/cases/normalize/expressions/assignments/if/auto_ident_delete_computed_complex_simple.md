# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > if > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
if ((a = delete $(arg)["y"]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpIfTest = a;
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const SSA_a = delete tmpDeleteObj.y;
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
