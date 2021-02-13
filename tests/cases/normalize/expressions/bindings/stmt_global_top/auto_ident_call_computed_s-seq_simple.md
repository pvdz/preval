# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_call_computed_s-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = (1, 2, b)["$"](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallObj = b;
let a = tmpCallObj['$'](1);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = b['$'](1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
