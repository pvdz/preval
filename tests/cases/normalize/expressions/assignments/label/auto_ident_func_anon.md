# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Label > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = function () {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = function () {
  debugger;
};
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
$(a);
`````

## Output


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
