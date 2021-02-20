# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw (a = delete arg[$("y")]);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompProp = $('y');
const SSA_a = delete arg[tmpDeleteCompProp];
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: Same
