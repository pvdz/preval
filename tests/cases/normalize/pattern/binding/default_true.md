# Preval test case

# default_true.md

> Normalize > Pattern > Binding > Default true
>
> Assignment pattern with default

#TODO

## Input

`````js filename=intro
const {
  a: b = $('default')
} = {
};
`````

## Pre Normal

`````js filename=intro
const { a: b = $(`default`) } = {};
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.a;
let b = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b = $(`default`);
} else {
  b = objPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
const tmpObjectPrototype = Object.prototype;
const objPatternBeforeDefault = tmpObjectPrototype.a;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(`default`);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'default'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
