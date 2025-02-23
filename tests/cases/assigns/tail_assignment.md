# Preval test case

# tail_assignment.md

> Assigns > Tail assignment
>
> An assignment at the end of a function may be dead code

## Input

`````js filename=intro
function f() {
  let x = $(1);
  function g(){ 
    $(x);
  }
  g();
  x = 10; // main point is getting rid of this one
}
$(f());
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(x);
  };
  let x = $(1);
  g();
  x = 10;
};
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(x);
    return undefined;
  };
  let x = $(1);
  g();
  x = 10;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  $(x);
  return undefined;
};
f();
$(undefined);
f();
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( b );
  return undefined;
};
a();
$( undefined );
a();
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
