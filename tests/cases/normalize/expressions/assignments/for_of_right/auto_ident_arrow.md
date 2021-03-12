# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > For of right > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = () => {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = () => {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = () => {};
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = () => {};
let x;
for (x of SSA_a) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
