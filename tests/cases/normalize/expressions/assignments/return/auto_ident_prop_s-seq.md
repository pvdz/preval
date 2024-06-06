# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Return > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, b).c);
}
$(f());
$(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = (1, 2, b).c);
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpAssignRhsProp = b;
  a = tmpAssignRhsProp.c;
  return a;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(1);
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
