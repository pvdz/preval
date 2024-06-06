# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;

  let a = { a: 999, b: 1000 };
  $(b)[$("x")] = $(c)[$("y")] = d;
  $(a, b, c, d);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;
  let a = { a: 999, b: 1000 };
  $(b)[$(`x`)] = $(c)[$(`y`)] = d;
  $(a, b, c, d);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let a = { a: 999, b: 1000 };
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c, d);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $(`x`);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
$(a, b, c, 3);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
a: 999,
b: 1000
;
const d = $( a );
const e = $( "x" );
const f = $( b );
const g = $( "y" );
f[g] = 3;
d[e] = 3;
$( c, a, b, 3 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
