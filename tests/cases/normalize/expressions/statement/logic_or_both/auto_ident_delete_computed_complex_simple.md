# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg)["y"] || delete $(arg)["y"];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete $(arg)[`y`] || delete $(arg)[`y`];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
} else {
  const tmpDeleteObj$1 = $(arg);
  delete tmpDeleteObj$1.y;
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpIfTest /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpIfTest) {
} else {
  const tmpDeleteObj$1 /*:unknown*/ = $(arg);
  delete tmpDeleteObj$1.y;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
if (c) {

}
else {
  const d = $( a );
  delete d.y;
}
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
