# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(1) ? typeof $(arg) : $(200);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(1) ? typeof $(arg) : $(200);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(arg);
} else {
  $(200);
}
$(a, arg);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 1 );
}
else {
  $( 200 );
}
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
