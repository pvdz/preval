# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > For in right > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for (let x in (a = b = 2));
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
for (let x in (a = b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, b, c);
`````

## Output

`````js filename=intro
let x;
for (x in 2) {
}
$(2, 2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
