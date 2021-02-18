# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > throw > auto_ident_delete_prop_s-seq
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
const arg = { y: 1 };
$(1);
$(2);
const tmpThrowArg = delete arg.y;
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: Same
