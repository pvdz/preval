# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Stmt-func-block > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= b.x = $(c).y = $(d);
  $(a, b, c);
}
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = { x: 2 },
      c = 3,
      d = 4;
    let a = (b.x = $(c).y = $(d));
    $(a, b, c);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    b.x = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(a, b, c);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(3);
  const varInitAssignLhsComputedRhs$1 = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const b = { x: 2 };
  b.x = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1, b, 3);
} else {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  b.y = c;
  const d = { x: 2 };
  d.x = c;
  $( c, d, 3 );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
