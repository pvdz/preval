# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $($)(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $($)(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
a = tmpCallCallee(1);
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee = $($);
const SSA_a = tmpCallCallee(1);
let x;
for (x of SSA_a) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
