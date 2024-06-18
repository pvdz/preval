# Preval test case

# closure_to_unreachable_closure.md

> Static arg ops > Assignment > Closure to unreachable closure
>
>

## Input

`````js filename=intro
let f; 
if ($) {
  let a = $();
  let b = $(); 
  f = function() {
    b = a;
    $(a);
    $(b);
  }
}
f(1);
f(2);
`````

## Pre Normal


`````js filename=intro
let f;
if ($) {
  let a = $();
  let b = $();
  f = function () {
    debugger;
    b = a;
    $(a);
    $(b);
  };
}
f(1);
f(2);
`````

## Normalized


`````js filename=intro
let f = undefined;
if ($) {
  let a = $();
  let b = $();
  f = function () {
    debugger;
    b = a;
    $(a);
    $(b);
    return undefined;
  };
} else {
}
f(1);
f(2);
`````

## Output


`````js filename=intro
let f = undefined;
if ($) {
  const a = $();
  let b = $();
  f = function () {
    debugger;
    b = a;
    $(a);
    $(b);
    return undefined;
  };
  f(1);
} else {
  f(1);
}
f(2);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
if ($) {
  const b = $();
  let c = $();
  a = function() {
    debugger;
    c = b;
    $( b );
    $( c );
    return undefined;
  };
  a( 1 );
}
else {
  a( 1 );
}
a( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
