# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > While > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
while ((a = !arg)) $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while ((a = !arg)) $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  a = !arg;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
$(false, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( false, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check