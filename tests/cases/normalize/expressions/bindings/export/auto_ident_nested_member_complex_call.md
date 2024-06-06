# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Bindings > Export > Auto ident nested member complex call
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

export let a = ($(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = ($(b)[$(`x`)] = $(c)[$(`y`)] = $(d));
export { a };
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c, d);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(3);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
const a = varInitAssignLhsComputedRhs$1;
export { a };
$(varInitAssignLhsComputedRhs$1, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = $( a );
const d = $( "x" );
const e = $( b );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
c[d] = g;
const h = g;
export { h as a from "undefined"
$( g, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
