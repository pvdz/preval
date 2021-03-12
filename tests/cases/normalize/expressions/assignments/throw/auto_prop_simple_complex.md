# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Throw > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = { b: $(1) });
a.b = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = { b: $(1) });
a.b = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
