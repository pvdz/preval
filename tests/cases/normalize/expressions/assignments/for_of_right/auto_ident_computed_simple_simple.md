# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = b["c"]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
for (let x of (a = b[`c`]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
a = b.c;
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
let x = undefined;
for (x of 1) {
}
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a of 1 {

}
const b = { c: 1 };
$( 1, b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
