# Preval test case

# func_lex.md

> Normalize > Naming > Func lex
>
> First an outer binding shadowed by block binding in a function

## Input

`````js filename=intro
function f() {
  let a = $(1);
  $(a);
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  return a;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = $(1);
  $(a);
  {
    let a$1 = $(1);
    $(a$1);
    if ($()) return a$1;
  }
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = $(1);
  $(a);
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const a = $(1);
  $(a);
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    return a;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( b );
  const c = $( 1 );
  $( c );
  const d = $();
  if (d) {
    return c;
  }
  else {
    return b;
  }
};
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
