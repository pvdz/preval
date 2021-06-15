# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident delete computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of delete arg["y"]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
for (let x of delete arg[`y`]);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = delete arg.y;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = delete arg.y;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
