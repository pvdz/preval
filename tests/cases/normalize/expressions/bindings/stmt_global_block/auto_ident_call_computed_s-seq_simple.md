# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = (1, 2, b)["$"](1);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { $: $ };
  let a = (1, 2, b)[`\$`](1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallObj = b;
let a = tmpCallObj.$(1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = b.$(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
