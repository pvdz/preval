# Preval test case

# hoisting_use_before_define.md

> binding > hoisting_use_before_define
>
> Trying to create classic tdz problems

The var is first updated before any branching so we should be able to safely determine it to be a constant.

This is the correct example of a hoisted var that is a constant.

#TODO

## Input

`````js filename=intro
var x;
$("something");
x = 100;
if ($(1)) {
  $(x);
}
$(x);
`````

## Normalized

`````js filename=intro
var x;
$('something');
x = 100;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x);
}
$(x);
`````

## Output

`````js filename=intro
$('something');
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(100);
}
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'something'
 - 2: 1
 - 3: 100
 - 4: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same