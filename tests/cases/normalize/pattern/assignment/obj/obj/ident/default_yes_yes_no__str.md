# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'pass2' }) } = 'abc');
$(y);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 'abc';
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { y: 'pass2' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = 'abc'.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { y: 'pass2' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Result

Should call `$` with:
 - 1: { y: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
