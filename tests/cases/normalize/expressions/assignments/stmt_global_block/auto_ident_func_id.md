# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = function f() {};
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = function f() {
    debugger;
  };
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
$(a);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f);
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
