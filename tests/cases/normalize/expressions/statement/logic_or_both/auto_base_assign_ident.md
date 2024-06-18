# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Logic or both > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) || (b = $(2));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
(b = $(2)) || (b = $(2));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpIfTest = b;
if (tmpIfTest) {
} else {
  b = $(2);
}
$(a, b);
`````

## Output


`````js filename=intro
const b = $(2);
const a = { a: 999, b: 1000 };
if (b) {
  $(a, b);
} else {
  const tmpClusterSSA_b = $(2);
  $(a, tmpClusterSSA_b);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b, a );
}
else {
  const c = $( 2 );
  $( b, c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
