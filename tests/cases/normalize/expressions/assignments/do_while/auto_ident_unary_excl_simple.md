# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = !arg));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = !arg)) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  a = !arg;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
$(100);
$(false, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( false, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
