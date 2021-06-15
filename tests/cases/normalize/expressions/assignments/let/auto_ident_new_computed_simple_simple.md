# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident new computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let xyz = (a = new b["$"](1));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let xyz = (a = new b[`$`](1));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const tmpClusterSSA_a = new $(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
