# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Throw > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = /foo/);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const SSA_a = /foo/;
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ /foo/ ]>')

Normalized calls: Same

Final output calls: Same
