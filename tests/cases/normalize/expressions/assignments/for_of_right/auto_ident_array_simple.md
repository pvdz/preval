# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = [1, 2, 3]));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = [1, 2, 3]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = [1, 2, 3];
let x;
for (x of SSA_a) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
