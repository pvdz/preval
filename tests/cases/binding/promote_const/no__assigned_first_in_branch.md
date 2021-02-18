# Preval test case

# hoisting_use_before_define.md

> binding > hoisting_use_before_define
>
> Trying to create classic tdz problems

The var is first updated in a branch so we can't make it a constant.

#TODO

## Input

`````js filename=intro
var x = 100;
if ($(1)) {
  x = 10;
}
$(x);
`````

## Normalized

`````js filename=intro
var x;
x = 100;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
$(x);
`````

## Output

`````js filename=intro
let SSA_x = 100;
const tmpIfTest = $(1);
if (tmpIfTest) {
  SSA_x = 10;
}
$(SSA_x);
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
