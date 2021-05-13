# Preval test case

# ident_member_sequence_simple.md

> Normalize > Binding > Stmt-global-top > Ident member sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
let a = (b.x, c).foo;
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 2 },
  c = 3;
let a = (b.x, c).foo;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
b.x;
const tmpCompObj = c;
let a = tmpCompObj.foo;
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const a = (3).foo;
$(a, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, { x: '2' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
