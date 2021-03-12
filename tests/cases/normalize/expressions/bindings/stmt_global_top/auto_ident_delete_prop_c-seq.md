# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident delete prop c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
const a = delete tmpDeleteObj.y;
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
