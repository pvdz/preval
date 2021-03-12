# Preval test case

# default_yes_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: 'abc', b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: 'abc', b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('pass');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: 'abc', b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('pass');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
