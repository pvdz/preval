# Preval test case

# auto_ident_new_computed_simple_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_new_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = new b["$"](1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpNewCallee = b.$;
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
