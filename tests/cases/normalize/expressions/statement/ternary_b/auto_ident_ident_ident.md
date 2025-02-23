# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Ternary b > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$(1) ? (b = 2) : $(200);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$(1) ? (b = 2) : $(200);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  b = 2;
} else {
  $(200);
}
$(a, b, c);
`````

## Output


`````js filename=intro
let b /*:number*/ = 1;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  b = 2;
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, 2);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {
  a = 2;
}
else {
  $( 200 );
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
 - 1: 1
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
