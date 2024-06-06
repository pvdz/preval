# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of 1 && 2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of 1 && 2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = 1;
if (tmpForOfDeclRhs) {
  tmpForOfDeclRhs = 2;
} else {
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
let x = undefined;
for (x of 2) {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a of 2) {

}
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
