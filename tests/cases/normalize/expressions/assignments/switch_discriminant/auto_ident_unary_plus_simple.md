# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary plus simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ((a = +arg)) {
  default:
    $(100);
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = +arg);
  if (true) {
    $(100);
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = +arg;
let tmpSwitchDisc = a;
$(100);
$(a, arg);
`````

## Output


`````js filename=intro
$(100);
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
