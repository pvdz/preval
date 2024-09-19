# Preval test case

# param_to_unreachable_closure.md

> Static arg ops > Assignment > Param to unreachable closure
>
>

## Input

`````js filename=intro
let f; { 
  let b = $(); 
  f = function(a) {
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
{
  let b = $();
  f = function ($$0) {
    let a = $$0;
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
let b = $();
f = function ($$0) {
  let a = $$0;
  debugger;
  b = a;
  $(a);
  $(b);
  return undefined;
};
f(1);
f(2);
`````

## Output


`````js filename=intro
$();
let b /*:number*/ = 1;
const f = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  $(a);
  $(b);
  return undefined;
};
f(1);
b = 2;
f(2);
`````

## PST Output

With rename=true

`````js filename=intro
$();
let a = 1;
const b = function($$0 ) {
  const c = d;
  debugger;
  $( c );
  $( a );
  return undefined;
};
b( 1 );
a = 2;
b( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
