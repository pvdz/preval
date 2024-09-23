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
if ($) {
  const a = $();
  $();
  let b = a;
  const tmpClusterSSA_f /*:()=>undefined*/ = function () {
    debugger;
    $(a);
    $(b);
    return undefined;
  };
  tmpClusterSSA_f();
  b = a;
  tmpClusterSSA_f();
} else {
  undefined();
  throw `[Preval]: Call expression with illegal callee must crash before this line ; \`undefined()\``;
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $();
  $();
  let b = a;
  const c = function() {
    debugger;
    $( a );
    $( b );
    return undefined;
  };
  c();
  b = a;
  c();
}
else {
  undefined.undefined();
  throw "[Preval]: Call expression with illegal callee must crash before this line ; `undefined()`";
}
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
