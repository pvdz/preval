# Preval test case

# lex_func.md

> Normalize > Naming > Lex func
>
> First a block binding shadowing a later outer binding in a function

## Input

`````js filename=intro
function f() {
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  let a = $(1);
  $(a);
  return a;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a$1 = $(1);
    $(a$1);
    if ($()) return a$1;
  }
  let a = $(1);
  $(a);
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    let a = $(1);
    $(a);
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
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    const a = $(1);
    $(a);
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
  const c = $();
  if (c) {
    return b;
  }
  else {
    const d = $( 1 );
    $( d );
    return d;
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
 - 3: 
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
