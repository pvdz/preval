# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw typeof arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = typeof arg;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
throw 'number';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ number ]>')

Normalized calls: Same

Final output calls: Same
