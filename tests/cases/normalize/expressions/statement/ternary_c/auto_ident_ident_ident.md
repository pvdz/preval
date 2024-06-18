# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Ternary c > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : (b = 2);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$(0) ? $(100) : (b = 2);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = 2;
}
$(a, b, c);
`````

## Output


`````js filename=intro
let b = 1;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = 2;
}
const a = { a: 999, b: 1000 };
$(a, b, 2);
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
  a = 2;
}
const c = {
  a: 999,
  b: 1000,
};
$( c, a, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
