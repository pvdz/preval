# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg)[$("y")] && delete ($(1), $(2), arg)[$("y")];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg)[$(`y`)] && delete ($(1), $(2), arg)[$(`y`)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $(`y`);
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
} else {
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete arg[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 = $(`y`);
  delete arg[tmpDeleteCompProp$1];
} else {
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
$( 1 );
$( 2 );
const c = $( "y" );
const d = delete a[ c ];
if (d) {
  $( 1 );
  $( 2 );
  const e = $( "y" );
  delete a[ e ];
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: 1
 - 5: 2
 - 6: 'y'
 - 7: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
