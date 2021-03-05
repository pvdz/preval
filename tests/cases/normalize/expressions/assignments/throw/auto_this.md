# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Throw > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = this);
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = this;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const SSA_a = this;
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ undefined ]>')

Normalized calls: Same

Final output calls: Same
