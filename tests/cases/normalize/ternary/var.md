# Preval test case

# var.md

> Normalize > Ternary > Var
>
> Example of rewriting a var decl with ternary as init

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
var foo = a ? b : c;
$(foo);
`````

## Pre Normal


`````js filename=intro
let foo = undefined;
let a = 1,
  b = 2,
  c = 3;
foo = a ? b : c;
$(foo);
`````

## Normalized


`````js filename=intro
let foo = undefined;
let a = 1;
let b = 2;
let c = 3;
if (a) {
  foo = b;
} else {
  foo = c;
}
$(foo);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
