# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = b[$("c")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
throw (a = b[$('c')]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompProp = $('c');
const SSA_a = b[tmpAssignRhsCompProp];
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
