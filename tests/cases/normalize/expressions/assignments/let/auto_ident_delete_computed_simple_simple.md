# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > let > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = (a = delete arg["y"]);
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg.y;
let xyz = a;
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const SSA_a = delete arg.y;
$(SSA_a);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
