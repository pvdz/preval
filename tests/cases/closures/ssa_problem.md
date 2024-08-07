# Preval test case

# ssa_problem.md

> Closures > Ssa problem
>
> Trying to come up with ssa problem cases regarding closures

## Input

`````js filename=intro
//f();
let a = 1;
$(a);
f();
a = 3;
$(a);
function f() {
  a = 2;
}
f();
$(a);
a = 4;
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  a = 2;
};
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  a = 2;
  return undefined;
};
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Output


`````js filename=intro
$(1);
$(3);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
