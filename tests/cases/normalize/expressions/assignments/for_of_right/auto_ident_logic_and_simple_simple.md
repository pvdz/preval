# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = 1 && 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = 1 && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  a = 2;
}
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 1;
if (SSA_a) {
  SSA_a = 2;
}
const tmpForOfDeclRhs = SSA_a;
let x;
for (x of tmpForOfDeclRhs) {
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
