# Preval test case

# string_key.md

> Object literal > String key
>
> Make sure the string key gets properly deserialized and serialized with strings vs templates

#TODO

## Input

`````js filename=intro
const x = {
    "hello, world!": $(1),
    "hey, me too!"() { return $(2); },
};
$(x, x['Hey, me too!']());
`````

## Pre Normal

`````js filename=intro
const x = {
  'hello, world!': $(1),
  'hey, me too!'() {
    debugger;
    return $(2);
  },
};
$(x, x[`Hey, me too!`]());
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(1);
const x = {
  'hello, world!': tmpObjLitVal,
  'hey, me too!'() {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  },
};
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = x[`Hey, me too!`]();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const x = {
  'hello, world!': tmpObjLitVal,
  'hey, me too!'() {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  },
};
const tmpCalleeParam$1 = x[`Hey, me too!`]();
$(x, tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
