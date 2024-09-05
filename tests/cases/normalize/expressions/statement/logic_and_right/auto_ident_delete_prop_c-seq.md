# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Logic and right > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) && delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100) && delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
} else {
}
$(a, arg);
`````

## Output


`````js filename=intro
const tmpIfTest = $(100);
const arg = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
} else {
}
const a = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
if (a) {
  $( 1 );
  $( 2 );
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
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
