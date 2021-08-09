# Preval test case

# method_prop.md

> Normalize > Object > Dupe props > Method prop
>
> Duplicate properties are legal but useless. We should get rid of them.

#TODO

## Input

`````js filename=intro
const x = {a(){}, a: $('prop')};
$(x);
`````

## Pre Normal

`````js filename=intro
const x = {
  a() {
    debugger;
  },
  a: $(`prop`),
};
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(`prop`);
const x = { a: tmpObjLitVal };
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(`prop`);
const x = { a: tmpObjLitVal };
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prop'
 - 2: { a: '"prop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same