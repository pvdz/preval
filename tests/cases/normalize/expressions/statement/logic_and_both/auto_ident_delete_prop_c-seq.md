# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg)).y && delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg)).y && delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  delete tmpDeleteObj$1.y;
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
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  delete tmpDeleteObj$1.y;
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
const c = $( a );
const d = delete c.y;
if (d) {
  $( 1 );
  $( 2 );
  const e = $( a );
  delete e.y;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 1
 - 5: 2
 - 6: {}
 - 7: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
