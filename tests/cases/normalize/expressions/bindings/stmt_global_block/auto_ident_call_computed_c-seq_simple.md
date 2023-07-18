# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = (1, 2, $(b))["$"](1);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { $: $ };
  let a = (1, 2, $(b))[`\$`](1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallObj = $(b);
let a = tmpCallObj.$(1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
const a = tmpCallObj.$(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
