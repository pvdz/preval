# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > For in right > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = function () {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = function () {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {};
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function () {};
let x;
for (x in SSA_a) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
