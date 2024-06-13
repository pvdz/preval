# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of delete arg[$("y")]);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
for (let x of delete arg[$(`y`)]);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpForOfDeclRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteCompProp = $(`y`);
const tmpForOfDeclRhs = delete arg[tmpDeleteCompProp];
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( "y" );
const d = delete a[ c ];
let e = undefined;
for (e of d) {

}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
