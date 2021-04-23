# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > For in right > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (b = $(2)));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x in (b = $(2)));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpForInDeclRhs = b;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const b = $(2);
let x = undefined;
for (x in b) {
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
