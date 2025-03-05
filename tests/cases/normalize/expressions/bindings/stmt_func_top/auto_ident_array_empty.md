# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident array empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = [];
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = [];
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = [];
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a /*:array*/ = [];
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
