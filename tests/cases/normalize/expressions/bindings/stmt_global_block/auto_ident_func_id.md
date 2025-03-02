# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = function f() {};
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = function f() {
    debugger;
  };
  $(a);
}
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
let a = f;
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
