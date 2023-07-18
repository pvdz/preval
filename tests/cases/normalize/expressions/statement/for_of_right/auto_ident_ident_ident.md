# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > For of right > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for (let x of (b = 2));
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
for (let x of (b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpForOfDeclRhs = b;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, b, c);
`````

## Output

`````js filename=intro
let x = undefined;
for (x of 2) {
}
const a = { a: 999, b: 1000 };
$(a, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a of 2 {

}
const b = {
a: 999,
b: 1000
;
$( b, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
