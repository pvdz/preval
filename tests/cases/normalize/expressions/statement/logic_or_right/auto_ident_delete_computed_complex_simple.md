# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Logic or right > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) || delete $(arg)["y"];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100) || delete $(arg)[`y`];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
}
$(a, arg);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
} else {
  const tmpDeleteObj /*:unknown*/ = $(arg);
  delete tmpDeleteObj.y;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
if (a) {

}
else {
  const c = $( b );
  delete c.y;
}
const d = {
  a: 999,
  b: 1000,
};
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { y: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
