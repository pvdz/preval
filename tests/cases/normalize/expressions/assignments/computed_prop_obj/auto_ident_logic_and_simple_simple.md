# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = 1 && 2)["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = 1 && 2)[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = 1;
if (a) {
  a = 2;
} else {
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
(2).a;
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
2.a;
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
