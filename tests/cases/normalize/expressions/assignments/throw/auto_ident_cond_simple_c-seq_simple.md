# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = 1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = 1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(60);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = $(60);
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
