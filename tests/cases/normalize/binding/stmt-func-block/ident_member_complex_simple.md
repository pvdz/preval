# Preval test case

# ident_member_complex_simple.md

> Normalize > Binding > Stmt-func-block > Ident member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3;
  let a= $(b).x = c;
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
      c = 3;
    let a = ($(b).x = c);
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
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedRhs = c;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
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
  const b = { x: 2 };
  const varInitAssignLhsComputedObj = $(b);
  varInitAssignLhsComputedObj.x = 3;
  $(3, b, 3);
} else {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = { x: 2 };
  const c = $( b );
  c.x = 3;
  $( 3, b, 3 );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 3, { x: '3' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
