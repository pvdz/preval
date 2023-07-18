# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Throw > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
throw delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpThrowArg = delete tmpDeleteObj.y;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
$(1);
$(2);
throw true;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ true ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
