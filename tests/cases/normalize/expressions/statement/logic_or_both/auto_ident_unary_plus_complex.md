# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
+$(100) || +$(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
+$(100) || +$(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpIfTest = +tmpUnaryArg;
if (tmpIfTest) {
} else {
  const tmpUnaryArg$1 = $(100);
  +tmpUnaryArg$1;
}
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpIfTest /*:number*/ = +tmpUnaryArg;
if (tmpIfTest) {
} else {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  +tmpUnaryArg$1;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = +a;
if (b) {

}
else {
  const c = $( 100 );
  +c;
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
