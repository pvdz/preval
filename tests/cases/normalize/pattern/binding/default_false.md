# Preval test case

# default_false.md

> Normalize > Pattern > Binding > Default false
>
> Assignment pattern with default

#TODO

## Input

`````js filename=intro
const {
  a: b = $('default')
} = {
  a: $('prop')
};
`````

## Pre Normal

`````js filename=intro
const { a: b = $(`default`) } = { a: $(`prop`) };
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(`prop`);
const bindingPatternObjRoot = { a: tmpObjLitVal };
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
const tmpObjLitVal = $(`prop`);
const tmpIfTest = tmpObjLitVal === undefined;
if (tmpIfTest) {
  $(`default`);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prop'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
