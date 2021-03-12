# Preval test case

# no__hoisting_use_before_define.md

> Binding > Promote const > No  hoisting use before define
>
> Trying to create classic tdz problems

The var is used in different scopes so not easy to change it to a constant.

#TODO

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
  x = 20;
};
x = 100;
g();
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const g = function () {
  x = 20;
};
x = 100;
g();
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
$(x);
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
