# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = delete arg["y"]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
for (let x of (a = delete arg['y']));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg.y;
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const SSA_a = delete arg.y;
let x;
for (x of SSA_a) {
}
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
