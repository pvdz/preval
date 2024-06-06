# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > For of right > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = []));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = []));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
let x = undefined;
const a = [];
for (x of a) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [];
for (a of b) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
