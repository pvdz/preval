# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : delete $(arg)["y"];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : delete $(arg)[`y`];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
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
const c = $( 0 );
if (c) {
  $( 100 );
}
else {
  const d = $( a );
  delete d.y;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
