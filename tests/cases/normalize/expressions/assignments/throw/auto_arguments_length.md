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

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const SSA_a = arguments;
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Arguments] ]>')

Normalized calls: Same

Final output calls: Same
