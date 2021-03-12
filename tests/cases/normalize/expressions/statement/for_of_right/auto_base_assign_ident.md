# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > For of right > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of (b = $(2)));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x of (b = $(2)));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpForOfDeclRhs = b;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_b = $(2);
let x;
for (x of SSA_b) {
}
$(a, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
