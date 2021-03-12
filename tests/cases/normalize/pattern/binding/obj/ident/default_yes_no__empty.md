# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = 1;
const objPatternBeforeDefault = $tdz$__pattern_after_default.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (1).x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $('fail');
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fail'
 - 2: 'bad'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
