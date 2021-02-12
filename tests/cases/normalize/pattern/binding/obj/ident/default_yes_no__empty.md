# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > ident > default_yes_no__empty
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
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
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
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 1: 'fail'
 - 2: 'bad'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
