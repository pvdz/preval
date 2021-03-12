# Preval test case

# default_yes_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = {};
$(x);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = {};
const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = {};
const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
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
