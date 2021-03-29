# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > For in right > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for (let x in (b = 2));
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
for (let x in (b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpForInDeclRhs = b;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a, b, c);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let x = undefined;
for (x in 2) {
}
$(a, 2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
