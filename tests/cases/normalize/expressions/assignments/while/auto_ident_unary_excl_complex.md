# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > While > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = !$(100))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = !$(100))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
let a /*:boolean*/ = !tmpUnaryArg;
if (tmpUnaryArg) {
} else {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpUnaryArg$1 = $(100);
    a = !tmpUnaryArg$1;
    if (tmpUnaryArg$1) {
      break;
    } else {
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = !a;
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( 100 );
    b = !c;
    if (c) {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
