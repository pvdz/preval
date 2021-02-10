# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_new_ident_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = new $($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
