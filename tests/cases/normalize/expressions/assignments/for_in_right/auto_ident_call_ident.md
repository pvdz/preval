# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > For in right > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = $(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = $(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const a = $(1);
let x = undefined;
for (x in a) {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
