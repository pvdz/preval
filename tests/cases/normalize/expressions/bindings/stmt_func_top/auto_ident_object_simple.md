# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { x: 1, y: 2, z: 3 };
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { x: 1, y: 2, z: 3 };
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { x: 1, y: 2, z: 3 };
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
x: 1,
y: 2,
z: 3
;
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
