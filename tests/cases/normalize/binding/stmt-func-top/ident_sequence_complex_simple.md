# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > Stmt-func-top > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3;
  let a = ($(b), $(c)).x = c;
  $(a, b, c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = 2,
    c = 3;
  let a = (($(b), $(c)).x = c);
  $(a, b, c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = 2;
  let c = 3;
  $(b);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
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
$(2);
const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
varInitAssignLhsComputedObj.x = 3;
$(3, 2, 3);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
a.x = 3;
$( 3, 2, 3 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
