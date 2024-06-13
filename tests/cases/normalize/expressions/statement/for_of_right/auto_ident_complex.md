# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of $(b));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x of $(b));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = $(b);
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpForOfDeclRhs = $(1);
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = undefined;
for (b of a) {

}
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
