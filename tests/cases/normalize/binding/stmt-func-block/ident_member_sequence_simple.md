# Preval test case

# ident_member_sequence_simple.md

> Normalize > Binding > Stmt-func-block > Ident member sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3;
  let a= (b.x, c).foo;
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
    let a = (b.x, c).foo;
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
    b.x;
    const tmpCompObj = c;
    let a = tmpCompObj.foo;
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
  const a = (3).foo;
  const b = { x: 2 };
  $(a, b, 3);
} else {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = 3.foo;
  const c = { x: 2 };
  $( b, c, 3 );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: undefined, { x: '2' }, 3
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
