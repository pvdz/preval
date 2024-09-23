# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident func anon
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = function () {};
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
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
  let a = function () {
    debugger;
    return undefined;
  };
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a /*:()=>*/ = function () {
  debugger;
  return undefined;
};
$(a);
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
