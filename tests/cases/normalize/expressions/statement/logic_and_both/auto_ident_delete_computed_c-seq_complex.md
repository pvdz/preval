# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident delete computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg))[$("y")] && delete ($(1), $(2), $(arg))[$("y")];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg))[$(`y`)] && delete ($(1), $(2), $(arg))[$(`y`)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $(`y`);
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
} else {
}
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $(`y`);
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
} else {
}
const a = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
if (d) {
  $( 1 );
  $( 2 );
  const e = $( a );
  const f = $( "y" );
  delete e[ f ];
}
const g = {
  a: 999,
  b: 1000,
};
$( g, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 'y'
 - 9: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
