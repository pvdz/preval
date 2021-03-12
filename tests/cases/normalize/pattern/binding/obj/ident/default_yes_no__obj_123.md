# Preval test case

# default_yes_no__obj_123.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: 1, b: 2, c: 3 };
const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: 1, b: 2, c: 3 };
const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
