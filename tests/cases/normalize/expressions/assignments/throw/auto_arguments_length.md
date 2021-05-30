# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Throw > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = arguments);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = arguments);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
throw arguments;
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Arguments] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
