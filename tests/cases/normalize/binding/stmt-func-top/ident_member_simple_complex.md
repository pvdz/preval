# Preval test case

# ident_member_simple_complex.md

> Normalize > Binding > Stmt-func-top > Ident member simple complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = b.x = c;
  $(a, b, c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 },
    c = 3;
  let a = (b.x = c);
  $(a, b, c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 };
  let c = 3;
  const varInitAssignLhsComputedRhs = c;
  b.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const b = { x: 3 };
$(3, b, 3);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 3 };
$( 3, a, 3 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
