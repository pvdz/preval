# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = !$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = !$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = !tmpUnaryArg;
let x;
for (x in SSA_a) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
