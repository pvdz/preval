# Preval test case

# write_write_closure.md

> Assigns > Write write closure
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
function f() {
  $(x, 'closure');
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(x, `closure`);
};
let x = $(1);
x = $(2);
$(x);
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(x, `closure`);
  return undefined;
};
let x = $(1);
x = $(2);
$(x);
f();
`````

## Output

`````js filename=intro
$(1);
const x = $(2);
$(x);
$(x, `closure`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
$( a, "closure" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2, 'closure'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
