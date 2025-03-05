# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = function f() {};
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = function f$1() {
    debugger;
  };
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const f$1 = function () {
    debugger;
    return undefined;
  };
  let a = f$1;
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f$1 /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f$1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
