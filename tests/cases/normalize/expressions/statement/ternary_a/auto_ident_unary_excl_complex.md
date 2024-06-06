# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
!$(100) ? $(100) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
!$(100) ? $(100) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(200);
} else {
  $(100);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(200);
} else {
  $(100);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( 200 );
}
else {
  $( 100 );
}
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
