# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = $(b)));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x of (a = $(b)));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = $(b);
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Output


`````js filename=intro
const a = $(1);
let x = undefined;
for (x of a) {
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = undefined;
for (b of a) {

}
$( a, 1 );
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
