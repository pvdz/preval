# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > If > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
if ((a = new (1, 2, b).$(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
if ((a = new (1, 2, b).$(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = b.$;
const SSA_a = new tmpNewCallee(1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
