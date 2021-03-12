# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > For of right > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = arguments));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = arguments;
let x;
for (x of SSA_a) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
