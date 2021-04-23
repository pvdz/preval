# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 && 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  a = 2;
} else {
}
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
let x = undefined;
for (x in 2) {
}
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
