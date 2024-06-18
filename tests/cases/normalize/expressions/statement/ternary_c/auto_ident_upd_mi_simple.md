# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : --b;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(0) ? $(100) : --b;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = b - 1;
}
$(a, b);
`````

## Output


`````js filename=intro
let b = 1;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = 0;
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 0 );
if (b) {
  $( 100 );
}
else {
  a = 0;
}
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
