# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = !$(100))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = !$(100));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
$(100);
const a = !tmpUnaryArg;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( 100 );
const b = !a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
