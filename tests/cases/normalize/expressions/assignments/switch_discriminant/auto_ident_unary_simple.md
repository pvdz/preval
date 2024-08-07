# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ((a = typeof x)) {
  default:
    $(100);
}
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = typeof x);
  if (true) {
    $(100);
  } else {
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpSwitchDisc = a;
$(100);
$(a, x);
`````

## Output


`````js filename=intro
$(100);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
