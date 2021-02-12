# Preval test case

# complex_object.md

> normalize > call > complex_object
>
> Calls should have simple objects

#TODO

## Input

`````js filename=intro
const a = {b: $};
$(a).b($(1), $(2));
`````

## Normalized

`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
