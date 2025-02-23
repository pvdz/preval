# Preval test case

# console.md

> Let hoisting > Console
>
> console.log can be considered side effect free

## Input

`````js filename=intro
let f = function() {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
console.log('hi');
let x = $(2);
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
console.log(`hi`);
let x = $(2);
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
console.log(`hi`);
let x = $(2);
f();
`````

## Output


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
console.log(`hi`);
$(x, `f`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
console.log( "hi" );
$( a, "f" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
