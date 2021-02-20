# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call prop simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = b.$(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = b.$(1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = b.$(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
