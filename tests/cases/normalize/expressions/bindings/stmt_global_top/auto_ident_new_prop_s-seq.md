# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident new prop s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = new (1, 2, b).$(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
let a = new tmpNewCallee(1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = b.$;
const a = new tmpNewCallee(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
