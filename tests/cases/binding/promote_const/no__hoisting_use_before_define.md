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

## Normalized

`````js filename=intro
var x;
function g() {
  x = 20;
}
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
var x;
function g() {
  x = 20;
}
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

Normalized calls: Same

Final output calls: Same
