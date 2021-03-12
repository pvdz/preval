# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of ++b);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x of ++b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b + 1;
let tmpForOfDeclRhs = b;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let x;
for (x of 2) {
}
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
