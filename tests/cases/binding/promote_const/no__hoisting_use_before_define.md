# Preval test case

# no__hoisting_use_before_define.md

> Binding > Promote const > No  hoisting use before define
>
> Trying to create classic tdz problems

The var is used in different scopes so not easy to change it to a constant.

## Input

`````js filename=intro
var x = 100;
g();
if ($(1)) {
  x = 10;
}
$(x);
function g() {
  x = 20;
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let g = function () {
  debugger;
  x = 20;
};
x = 100;
g();
if ($(1)) {
  x = 10;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
let g = function () {
  debugger;
  x = 20;
  return undefined;
};
x = 100;
g();
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
} else {
}
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(20);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( 20 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
